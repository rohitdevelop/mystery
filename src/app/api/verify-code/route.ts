// import dbConnect from "@/src/lib/dbconnect";
// import Usermodel from "@/src/models/User";

// export async function POST(request: Request) {
//   await dbConnect();
//   try {
//     const { username, code } = await request.json();

//     const decodeduser = decodeURIComponent(username);
//     const user = Usermodel.findOne({ username: decodeduser });

//     if (!user) {
//       return Response.json(
//         {
//           success: false,
//           message: "user not found",
//         },
//         { status: 500 }
//       );
//     }

//     const isCodeValid = user.veryficode === code;
//     const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

//     if (isCodeValid && isCodeExpired) {
//       user.isVerified = true;
//       await user.save();
//       return Response.json(
//         {
//           success: true,
//           message: "Account varified successfully",
//         },
//         { status: 200 }
//       );
//     }else if(!isCodeExpired){
//       return Response.json(
//         {
//           success: false,
//           message: "varification code has expired pleas signup again to get new code",
//         },
//         { status: 400 }
//       );
//     }else{
//         return Response.json(
//         {
//           success: false,
//           message: "Incorrect varification code",
//         },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error("Error verifying user", error);

//     return Response.json(
//       { success: false, message: "Error checking username" },
//       { status: 500 }
//     );
//   }
// }




import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUser = decodeURIComponent(username);

     const user = await Usermodel.findOne({ username: decodedUser });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

     const isCodeValid = user.verifyCode === code;

     const isCodeExpired = new Date() > new Date(user.verifyCodeExpiry);

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        { status: 400 }
      );
    }

    if (isCodeExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    }

     user.isVerified = true;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Account verified successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
