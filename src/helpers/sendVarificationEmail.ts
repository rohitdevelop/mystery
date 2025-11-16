import { resend } from "../lib/resend";
import VarificationEmail from "../../emails/VarificationEmail";
import { Apiresponse } from "@/src/types/ApiResponse";

export async function sendVarificationEmail(
  username: string,
  email: string,
  varifycode: string
): Promise<Apiresponse> {
  try {
    await resend.emails.send({
      from: "rohitdev124421@gmial.com",
      to: email,
      subject: "mystry message | varification code",
      react: VarificationEmail({ username, otp: varifycode }),
    });
    return { success: true, message: "successfull email send" };
  } catch (EmailError) {
    console.error("email error", EmailError);

    return { success: false, message: "somthing wrong" };
  }
}
