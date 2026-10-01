import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const firstName = formData.get("firstName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const lastName = formData.get("lastName") as string;
    const contactNo = formData.get("contactNo") as string;
    const location = formData.get("location") as string;
    const email = formData.get("email") as string;
    const portfolio = formData.get("portfolio") as File | null;
    const cv = formData.get("cv") as File | null;

    const attachments = [];

    if (portfolio) {
      const portfolioBuffer = Buffer.from(await portfolio.arrayBuffer());
      attachments.push({
        filename: portfolio.name,
        content: portfolioBuffer,
        contentType: portfolio.type,
      });
    }

    if (cv) {
      const cvBuffer = Buffer.from(await cv.arrayBuffer());
      attachments.push({
        filename: cv.name,
        content: cvBuffer,
        contentType: cv.type,
      });
    } else {
      console.warn("CV is null or undefined.");
    }

    // ✅ Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mu8494759@gmail.com",
        pass: "dfwc owma lduq jngz",
      },
    });

    // ✅ Email Content with Attachments
    const mailOptions = {
      from: email,
      to: "careers@onyxrenders.com",
      subject: "📢 Job Application Received",
      reply_to: email,
      html: `
      <div style="
        font-family: Arial, sans-serif; 
        max-width: 600px; 
        margin: 0 auto; 
        padding: 20px; 
        border: 1px solid #ddd; 
        border-radius: 8px; 
        background-color: #f9f9f9;">
        
        <h2 style="color: #114046; text-align: center;">📄 ${jobTitle}</h2>
        <p style="font-size: 16px; text-align: center; color: #555;">
          A new job application has been submitted. Below are the details:
        </p>
    
        <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <p><strong>👤 Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>📞 Contact:</strong> ${contactNo}</p>
          <p><strong>📍 Location:</strong> ${location}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
        </div>
    
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="font-size: 14px; color: #888; text-align: center;">
          This email was sent automatically via the job application system.
        </p>
      </div>
      `,
      attachments,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Application submitted successfully and email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to process form data or send email" },
      { status: 500 }
    );
  }
}
