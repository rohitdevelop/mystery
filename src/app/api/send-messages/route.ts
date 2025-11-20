// import dbConnect from "@/src/lib/dbconnect";
// import Usermodel from "@/src/models/User";
// import { Message } from "@/src/models/User";
// import { success } from "zod";
// import { tr } from "zod/locales";

// export async function POST(request: Request) {
//     await dbConnect();
// const {username,content} = await request.json();
// try{
//  const user = await Usermodel.findOne({username})  
// if (!user) {
//    return Request.json({
//     success:false,
//     message:"user not found"
//    },{ status:404}) 
// } 

// if (!user.isAcceptingMessage) {
//     return Request.json({
//     success:false,
//     message:"user not found"
//    },{status:404}) 
// } 

// const newMessage={
//    content:content,
//    createdAt:new Date() 
// }
// user.messages.push(newMessage as Message);
// await user.save();

// return Request.json({
//     success:true,
//     message:"user not found"
//    },{status:200}) 
// } 
// }

// catch(error){
//     console.log("an unaccepted erroe",error);
    
//     return Request.json({
//     success:false,
//     message:"user not found"
//    },{status:404}) 
// } 
// }



import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";
import { Message } from "@/src/models/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, content } = await request.json();

    // Find user
    const user = await Usermodel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Check if user accepts messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "This user is not accepting messages right now",
        },
        { status: 403 }
      );
    }

    // Create new message
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
