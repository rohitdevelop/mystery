// import dbConnect from "@/src/lib/dbconnect";
// import z from "zod";
// import { UsernameValidation } from "@/src/schemas/signUpSchema";
// import Usermodel from "@/src/models/User";
 
// const UsernameQuerySchema = z.object({
//   username: UsernameValidation,
// });

// export async function GET(request: Request) {
//   await dbConnect();
//   try {
//     const { searchParams } = new URL(request.url);
//     const queryParam = {
//       username: searchParams.get("username"),
//     };
//     // validation with zod
//     const result = UsernameValidation.safeParse(queryParam);
//     // console.log(result);
//     if (!result.success) {
//       const usernameErrors = result.error.format().username?._errors || [];
//       return Response.json({
//         success: false,
//         message:
//           usernameErrors?.length > 0
//             ? usernameErrors.join(", ")
//             : "invalid query parameters",
//       },{status: 400});
//     };
//  const {username} = result.data

// const existingVarifiedUser = await Usermodel.findOne({username, isverified:true})
// if (existingVarifiedUser) {
//       return Response.json(
//       { success: false, message: "username already taken" },
//       { status: 400 }
//     )};


// return Response.json({
//     success:true,
//     message: 'username is unique'
// },{status:400})

//   } catch (error) {
//     console.error("error chacking", error);
//     return Response.json(
//       { success: false, message: "error cheking username" },
//       { status: 400 }
//     );
//   }
// }





import dbConnect from "@/src/lib/dbconnect";
import z from "zod";
import { UsernameValidation } from "@/src/schemas/signUpSchema";
import Usermodel from "@/src/models/User";

const UsernameQuerySchema = z.object({
  username: UsernameValidation,
});

export async function GET(request: Request) {
    console.log(`Received request with method: ${request.method}`);
    
if (request.method !== 'GET') {
        return Response.json(
      { success: false, message: "Method not allowed" },
      { status: 405 }
    );
}

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const queryParam = {username: searchParams.get("username")};
 
    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors =
        result.error.format().username?._errors || [];

      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

     const existingVerifiedUser = await Usermodel.findOne({
      username,
      isverified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    return Response.json(
      { success: true, message: "Username is unique" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error checking username", error);

    return Response.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
