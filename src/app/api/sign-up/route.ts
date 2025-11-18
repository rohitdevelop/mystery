// import { sendVarificationEmail } from "@/src/helpers/sendVarificationEmail";
// import dbConnect from "@/src/lib/dbconnect";
// import Usermodel from "@/src/models/User";
// import bcrypt from "bcryptjs";
// import { boolean } from "zod";

// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const { username, email, password } = await request.json();

//     const existingUserVarification = await Usermodel.findOne({
//       username,
//       isverified: true,
//     });
//     if (existingUserVarification) {
//       return Response.json(
//         { success: false, message: "User is already taken" },
//         { status: 400 }
//       );
//     }

//     const existUser = await Usermodel.findOne({ email });
//     const verifycode = Math.floor(100000 + Math.random() * 9000).toString();

//     if (existUser) {
//       if (existUser.isverified) {
//         return Response.json(
//           { success: false, message: "you already exist" },
//           { status: 500 }
//         );
//       } else {
//         const updatehashedPassword = await bcrypt.hash(password, 10);
//         existUser.password = updatehashedPassword;
//         existUser.verifycode = verifycode;
//         existUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
//         await existUser.save();
//       }
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const expirydate = new Date();
//       expirydate.setHours(expirydate.getHours() + 1);

//       const newUser = new Usermodel({
//         username,
//         email,
//         password: hashedPassword,
//         verifycode,
//         verifyCodeExpiry: expirydate,
//         isverified: false,
//         isAcceptingMessage: boolean,
//         messages: [],
//       });
//       await newUser.save();
//     }

//     const emailResponse = await sendVarificationEmail(
//       email,
//       username,
//       verifycode
//     );

//     if (!emailResponse.success) {
//       return Response.json(
//         { success: false, message: emailResponse.message },
//         { status: 400 }
//       );
//     } else {
//       return Response.json(
//         {
//           success: true,
//           message: "User registered successfully.Please verify your email",
//         },
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     console.error("Error register", error);
//     return Response.json(
//       { success: false, message: "Registration failed" },
//       { status: 500 }
//     );
//   }
// }











import { sendVarificationEmail } from "@/src/helpers/sendVarificationEmail";
import dbConnect from "@/src/lib/dbconnect";
import Usermodel from "@/src/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // create 6 digit code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // --- Check if username is already taken & verified ---
    const existingUserVerified = await Usermodel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerified) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    // --- Check if email exists ---
    const existingUser = await Usermodel.findOne({ email });

    if (existingUser) {
      // If user exists but not verified → update details
      if (!existingUser.isVerified) {
        existingUser.password = await bcrypt.hash(password, 10);
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour
        await existingUser.save();
      } else {
        return Response.json(
          { success: false, message: "User already exists" },
          { status: 400 }
        );
      }
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Usermodel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifyCodeExpiry: new Date(Date.now() + 3600000),
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    // --- Send email ---
    const emailResponse = await sendVarificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error register:", error);
    return Response.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
