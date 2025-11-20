import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
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
  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await Usermodel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          sussess: false,
          message: "faild to update user message",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          sussess: true,
          message: "message accesot sussessfully",
          updatedUser,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("faild to update", error);

    return Response.json(
      {
        sussess: false,
        message: "faild to update",
      },
      { status: 500 }
    );
  }
}

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
  const userId = user._id;

  try {
    const foundUser = await Usermodel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          sussess: false,
          message: "faild to found the user",
        },
        { status: 404 }
      );
    } else {
      return Response.json(
        {
          sussess: true,
          isAcceptingMessage: foundUser.isAcceptingMessage,

          message: "faild to found the user",
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
