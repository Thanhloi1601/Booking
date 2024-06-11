require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Thành Lợi" <chauthanhloi2k4@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
                <h3>Xin chào ${dataSend.patientName}!</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online</p>
                <p>Thông tin đặt lịch khám bệnh:</p>
                <div><b>Thời gian: ${dataSend.time}</b></div>
                <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
                <p>Nếu các thông tin trên là sự thật vui lòng click vào bênh dưới để xác nhận hoàn tất thủ tục dặt lịch khám bệnh</p>
                <div>

                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
                </div>
                <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
          <h3>Dear ${dataSend.patientName}!</h3>
          <p>You received this email because you made an online medical appointment</p>
          <p>Information on scheduling medical examinations:</p>
          <div><b>Time: ${dataSend.time}</b></div>
          <div><b>Doctor: ${dataSend.doctorName}</b></div>
          <p>If the above information is true, please click on the box below to confirm completion of the medical examination scheduling procedure</p>
          <div>

          <a href=${dataSend.redirectLink} target="_blank">Click here</a>
          </div>
          <div>Sincerely thank!</div>
          `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
