import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOrderStatusMail = async (
  email: string,
  status: string,
  orderId: string
) => {

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Order Update - ${status}`,
    html: `
      <h2>Your Order Status Updated</h2>
      <p><b>Order ID:</b> ${orderId}</p>
      <p><b>Status:</b> ${status}</p>
      <p>Thank you for shopping with us.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default { sendOrderStatusMail };