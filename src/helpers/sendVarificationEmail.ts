import { resend } from "../lib/resend";
import VarificationEmail from "@/src/emails/VarificationEmail";
import { Apiresponse } from "@/src/types/ApiResponse";

export async function sendVarificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<Apiresponse> {
  try {
    await resend.emails.send({
      from: "Mystry <onboarding@resend.dev>",
      to: email,
      subject: "mystry message | varification code",
      react: VarificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "successfull email send" };
  } catch (EmailError) {
    console.error("email error", EmailError);

    return { success: false, message: "somthing wrong" };
  }
}
