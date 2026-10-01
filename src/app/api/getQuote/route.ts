import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // Extract data from request
    const { name, email, countryCode, contactNo, inquiry, subject, message } =
      await req.json();

    if (
      !name ||
      !email ||
      !countryCode ||
      !contactNo ||
      !inquiry ||
      !subject ||
      !message
    ) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // ✅ Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mu8494759@gmail.com",
        pass: "dfwc owma lduq jngz",
      },
    });

    // ✅ Email Content
    const mailOptions = {
      to: "info@onyxrenders.com",
      reply_to: email,
      subject: `📩 New Quote Request: ${subject}`,
      html: `
        <div style="
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            background-color: #f9f9f9;">

            <h2 style="color: #114046; text-align: center;">📢 New Quote Inquiry</h2>
            <p style="font-size: 16px; text-align: center; color: #555;">
            You have received a new quote request. Below are the details:
            </p>

            <div style="background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
            <p><strong>📞 Contact:</strong> ${countryCode} ${contactNo}</p>
            <p><strong>📌 Inquiry Type:</strong> ${inquiry}</p>
            <p><strong>📝 Message:</strong> ${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

            <p style="font-size: 14px; color: #888; text-align: center;">
            This email was sent automatically via the website's "Get a Quote" form.
            </p>
        </div>
        `,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
