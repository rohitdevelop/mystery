import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";
import { User } from "next-auth";

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      {
        sussess: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await Usermodel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "$messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!user || user.length === 0) {
      return Response.json(
        {
          sussess: false,
          message: "user not found",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          sussess: true,
          message: user[0].messages,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("faild to update", error);

    return Response.json(
      {
        sussess: false,
        message: "Error in getting message acceptance status",
      },
      { status: 500 }
    );
  }
}
