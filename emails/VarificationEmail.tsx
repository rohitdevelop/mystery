import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button
} from "@react-email/components";

interface EmailTemplateProps {
  username: string;
  otp: string;
}

export const EmailTemplate = ({ username, otp }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      
       <Preview>Your OTP Code for Verification</Preview>

      <Body style={main}>
        <Container style={container}>

          <Heading style={title}>Hello {username},</Heading>

          <Text style={text}>
            Your One Time Password (OTP) for account verification is:
          </Text>

          <Section style={otpBox}>
            <Text style={otpText}>{otp}</Text>
          </Section>

          <Text style={text}>
            This OTP is valid for the next 10 minutes.  
            Please do not share it with anyone for security reasons.
          </Text>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <Button
              href="#"
              style={buttonStyle}
            >
              Verify Now
            </Button>
          </Section>

          <Text style={footer}>
            If you didn’t request this OTP, please ignore this email.
          </Text>

        </Container>
      </Body>
    </Html>
  );
};

/* ----- Styles ----- */

const main = {
  backgroundColor: "#f5f5f5",
  padding: "30px",
  fontFamily: "Arial, sans-serif"
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  maxWidth: "480px",
  margin: "0 auto",
  border: "1px solid #e5e5e5"
};

const title = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#333",
};

const text = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
};

const otpBox = {
  backgroundColor: "#f0f7ff",
  padding: "16px",
  borderRadius: "6px",
  textAlign: "center" as const,
  margin: "20px 0",
  border: "1px solid #cce2ff",
};

const otpText = {
  fontSize: "32px",
  fontWeight: "bold" as const,
  color: "#1a73e8",
  letterSpacing: "4px",
};

const buttonStyle = {
  backgroundColor: "#1a73e8",
  color: "white",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold" as const,
};

const footer = {
  fontSize: "12px",
  color: "#888",
  marginTop: "24px",
};

export default EmailTemplate;
