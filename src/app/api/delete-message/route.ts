// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/options";
// import dbConnect from "@/src/lib/dbconnect";
// import Usermodel from "@/src/models/User";
// import { User } from "next-auth";

// export async function DELETE(request: Request) {
//   try {
//     await dbConnect();

//     const session = await getServerSession(authOptions);
//     const user: User = session?.user as User;

//     // ---- Authentication Check ----
//     if (!session || !session.user) {
//       return Response.json(
//         { success: false, message: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const userId = user._id;

//     // ---- BODY ----
//     const { deleteMessages } = await request.json();

//     if (!deleteMessages || !Array.isArray(deleteMessages)) {
//       return Response.json(
//         { success: false, message: "deleteMessages must be an array of IDs" },
//         { status: 400 }
//       );
//     }

//     // ---- Delete Messages from User ----
//     const updatedUser = await Usermodel.findByIdAndUpdate(
//       userId,
//       {
//         $pull: {
//           messages: {
//             _id: { $in: deleteMessages }, // delete multiple messages
//           },
//         },
//       },
//       { new: true }
//     );

//     return Response.json(
//       {
//         success: true,
//         message: "Messages deleted successfully",
//         user: updatedUser,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE ERROR:", error);
//     return Response.json(
//       { success: false, message: "Server Error", error: error },
//       { status: 500 }
//     );
//   }
// }
