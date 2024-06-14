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
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
                <h3>Xin chào ${dataSend.patientName}!</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khám bệnh thành công</p>
               <p>Thông tin đơn thuốc/hoá đơn đucợ gửi teong thư đính kèm </p>
                <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
          <h3>Dear ${dataSend.patientName}!</h3>
          <p>You received this email because you have successfully scheduled a medical examination</p>
          <p>Prescription/invoice information is sent in the attached letter</p>
          <div>Sincerely thank!</div>
          `;
  }

  return result;
};
let sendAttackhment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
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
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line

        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            // define custom content type for the attachment
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttackhment: sendAttackhment,
};
