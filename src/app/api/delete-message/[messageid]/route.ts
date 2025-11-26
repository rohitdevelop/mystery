import { getServerSession } from "next-auth";
 import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";
import { User } from "next-auth";

export async function DELETE(request: Request, {params}: {params: {messageid: string}}) {
  const messageId = params.messageid;
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

try {
 const updatedresult = await Usermodel.updateOne(
    { _id: user._id  },
    { $pull: { messages: { _id: messageId} } }

)
if (updatedresult.modifiedCount === 0) {
  return Response.json(
    {sussess: false, message: "Message not found" },
    { status: 404 }
  )
}else{
  return Response.json(
    {sussess: true, message: "Message deleted successfully" },
  
    { status: 200 })

}
} catch (error) {
  return Response.json({
    sussess: false,
    message: "Internal server error",
  }, {status: 500
  })
}
  
}
