import User from "../Models/User.js";
import mailer from "nodemailer";
import dotenv from "dotenv";
import otpGenerator from "otp-generator";
import OTPs from "../Models/otpModel.js";
dotenv.config();

const pass = process.env.PASS;

// reset password email

async function resetPassword(req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    var transporter = mailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NO_REPLY_EMAIL,
        pass: pass,
      },
    });

    const emailContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>MyGlobalConsultant Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }
    
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
    
            .header h1 {
                color: #007bff;
                margin: 0;
            }
    
            .content {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
    
            .content strong {
                color: #007bff;
            }
    
            .list-item {
                margin-bottom: 10px;
            }
    
            .list-item strong {
                color: #007bff;
            }
    
            .footer {
                text-align: center;
                margin-top: 20px;
            }
    
            .footer p {
                margin: 0;
                color: #666666;
            }
    
            .footer a {
                color: #007bff;
                text-decoration: none;
            }
    
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset</h1>
            </div>
    
            <div class="content">
                <p>Dear ${user.username},</p>
    
                <p>We received a request to reset your password for your MyGlobal Consultant account. To proceed with the password reset, please follow the instructions below:</p>
    
                <ol>
                    <li>Click on the following link to reset your password:</li>
                    <li><a href="${process.env.FRONTEND_URL}/reset-password?id=${user._id}" style="color: #007bff; text-decoration: none;">${process.env.FRONTEND_URL}/reset-password?id=${user._id}</a></li>
                </ol>
    
                <p>If you didn't request this password reset, please ignore this email. Your account is secure and no action is required.</p>
            </div>
    
            <div class="footer">
                <p>Thank you for choosing MyGlobalConsultant.</p>
    
                <p>Best regards,<br>MyGlobalConsultant Support Team</p>
            </div>
        </div>
    </body>
    </html>
    `;

    var mailOptions = {
      from: process.env.NO_REPLY_EMAIL,
      to: req.body.email,
      subject: "Password Reset Request",
      html: emailContent,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).send(false);
      } else {
        res.status(200).send(true);
      }
    });
  } else {
    res.status(400).send(false);
  }
}

// confirmation email

async function confirmEmail(senderEmail, username, otp) {
  var transporter = mailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: pass,
    },
  });

  const emailContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

    <p style="font-size: 16px;">Dear ${username},</p>

    <p style="font-size: 16px;">Thank you for choosing MyGlobalConsultant! We are excited to have you on board.</p>

    <p style="font-size: 16px;">To complete your registration and ensure the security of your account, please verify your email address by entering the OTP (One-Time Password) provided below:</p>

    <p style="font-size: 18px; font-weight: bold; color: #007bff;">OTP: ${otp}</p>

    <p style="font-size: 16px;">Please use this OTP within the next 5 minutes to verify your email address. If you did not initiate this registration, please disregard this email.</p>

    <p style="font-size: 16px;">If you encounter any issues or have any questions, feel free to reach out to our support team at <a href="mailto:support@myglobalconsultant.com" style="color: #007bff; text-decoration: none;">support@myglobalconsultant.com</a> or call us at <a href="tel:+919812338209" style="color: #007bff; text-decoration: none;">+919812338209</a>.</p>

    <p style="font-size: 16px;">Thank you for choosing MyGlobalConsultant.</p>

    <p style="font-size: 16px; margin-top: 20px;">Best regards,<br>MyGlobalConsultant</p>

  </div>

</body>
</html>
`;

  var mailOptions = {
    from: process.env.NO_REPLY_EMAIL,
    to: senderEmail,
    subject: "Emaid Id Confirmation",
    html: emailContent,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending mail", error);
        reject(error);
      }
      resolve("send");
    });
  });
}

async function emailVerification(req, res, next) {
  const { otp } = req.body;
  const email = req.session.passport.user;
  const user = await User.findOne({ email: email });
  const otpObject = await OTPs.findOne({ email: email });
  if (otpObject) {
    if (otpObject.otp === otp) {
      await User.updateOne({ email: email }, { isVerified: true });
      await confirmRegistration(user.email, user.username);
      await OTPs.deleteOne({ email: email });
      res.status(200).json({ message: "Email Verified", success: true });
    } else {
      res.status(201).json({ message: "OTP does not match.", success: false });
    }
  } else {
    res
      .status(404)
      .json({ message: "OOPS some error occured. Plese try again later." });
  }
}

async function resendOTP(req, res, next) {
  try {
    const user = await User.findOne({ email: req.session.passport.user });
    const otp = otpGenerator.generate(6, {
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });
    const previousOTP = await OTPs.findOne({ email: user.email });
    if (previousOTP) {
      await OTPs.updateOne(
        { email: user.email },
        { $set: { otp: otp } },
        { upsert: true }
      );
    } else {
      await OTPs.create({
        email: user.email,
        otp: otp,
      });
    }
    await confirmEmail(user.email, user.username, otp);
    res.status(200).json({ message: "OTP resend;" });
  } catch (error) {
    res.status(400).json({ message: "OOPS some error occured." });
  }
}

async function confirmRegistration(senderEmail, username) {
  var transporter = mailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NO_REPLY_EMAIL,
      pass: pass,
    },
  });

  const emailContent = `
  <!DOCTYPE html>
<html>
<head>
    <title>Welcome to MyGlobalConsultant</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #007bff;
            margin: 0;
        }

        .content {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .content strong {
            color: #007bff;
        }

        .list-item {
            margin-bottom: 10px;
        }

        .list-item strong {
            color: #007bff;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
        }

        .footer p {
            margin: 0;
            color: #666666;
        }

        .footer a {
            color: #007bff;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to MyGlobalConsultant</h1>
        </div>

        <div class="content">
            <p>Dear ${username}</p>

            <p>Congratulations! You've successfully registered with MyGlobalConsultant, your gateway to professional consultancy services worldwide. We're excited to have you join our community!</p>

            <p><strong>What's Next?</strong></p>
            <ul>
                <li class="list-item"><strong>Explore Opportunities Abroad:</strong> Take some time to explore our platform and discover a wide range of opportunities offered by top universities and educational institutions around the world.</li>
                <li class="list-item"><strong>Apply with Ease:</strong> Once you've found the opportunities that align with your goals, you can apply for them directly through our platform. Our streamlined application process makes it easy for you to submit your applications hassle-free.</li>
                <li class="list-item"><strong>Connect with Experts:</strong> If you have any questions or need guidance while exploring opportunities or applying for programs, don't hesitate to reach out to our team of experienced consultants. They're here to provide personalized advice and support to help you make informed decisions.</li>
            </ul>
        </div>

        <div class="footer">
            <p>If you have any queries or require assistance, please don't hesitate to contact our dedicated support team at <a href="mailto:support@myglobalconsultant.com">support@myglobalconsultant.com</a> or call us at <a href="tel:+919812338209">+91 98123 38209</a>. We're committed to helping you achieve your academic and career aspirations.</p>

            <p>Once again, welcome to MyGlobalConsultant! We're thrilled to be a part of your journey towards studying abroad and expanding your horizons.</p>

            <p>Best regards,<br>MyGlobalConsultant Team</p>
        </div>
    </div>
</body>
</html>

`;

  var mailOptions = {
    from: process.env.NO_REPLY_EMAIL,
    to: senderEmail,
    subject:
      "Emaid Id ConfirmationWelcome to MyGlobalConsultant - Registration Confirmation",
    html: emailContent,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending mail", error);
        reject(error);
      }
      resolve("send");
    });
  });
}

async function messagesEmail(data) {
  var transporter = mailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.INFO_EMAIL,
      pass: pass,
    },
  });

  const emailContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Message from ${data.name}</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
          }
  
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
              margin-bottom: 30px;
          }
  
          .header h1 {
              color: #007bff;
              margin: 0;
          }
  
          .content {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
          }
  
          .content strong {
              color: #007bff;
          }
  
          .footer {
              text-align: center;
              margin-top: 20px;
          }
  
          .footer p {
              margin: 0;
              color: #666666;
          }
  
          .footer a {
              color: #007bff;
              text-decoration: none;
          }
  
          .footer a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Message from MyGlobalConsultant User</h1>
          </div>
  
          <div class="content">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Contact:</strong> ${data.number}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message}</p>
          </div>
  
          <div class="footer">
              <p>This message was sent by ${data.name}.</p>
          </div>
      </div>
  </body>
  </html>
  

`;

  var mailOptions = {
    from: process.env.INFO_EMAIL,
    to: process.env.MESSAGE_EMAIL,
    subject: `Message from ${data.name}`,
    html: emailContent,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending mail", error);
        reject(error);
      }
      resolve("send");
    });
  });
}

async function applyEmail(user, schedule, courses, folder) {
  let tableData = "";
  courses.forEach((course, index) => {
    tableData += `
        <tr>
            <td>${index}</td>
            <td>${course.Course_Name}</td>
            <td>${course.Institute_Name}</td>
            <td>${course.Full_Address}</td>
            <td>${course.Yearly_Tuition_Fees}</td>
        </tr>
    `;
  });

  var transporter = mailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.INFO_EMAIL,
      pass: pass,
    },
  });

  const emailContent = `
 <!DOCTYPE html>
  <html>
  <head>
      <title>M${user.name} has applied</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
          }
  
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
              margin-bottom: 30px;
          }
  
          .header h1 {
              color: #007bff;
              margin: 0;
          }
  
          .content {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
            width:100%;
          }
  
          .content strong {
              color: #007bff;
          }
        
        .table-container{
          overflow-y:scroll;
          width:100%;
          padding :1rem 0;
        }
          table{
              border-collapse:collapse;
              width : 100%;
          }
          td,th{
              border:2px solid black;
            white-space:nowrap;
          }
  
          .footer {
              text-align: center;
              margin-top: 20px;
          }
  
          .footer p {
              margin: 0;
              color: #666666;
          }
  
          .footer a {
              color: #007bff;
              text-decoration: none;
          }
  
          .footer a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>${user.username} has applied</h1>
          </div>
  
          <div class="content">
              <p><strong>Name:</strong> ${user.username}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Contact:</strong> ${user.number}</p>
              <p><strong>courses:</strong></p>
            <div class="table-container">
              <table>
                  <thead>
                      <tr>
                          <th>S.No</th>
                          <th>Course Name</th>
                          <th>Institute</th>
                          <th>Address</th>
                          <th>Tution Fees</th>
                      </tr>
                  </thead>
                  <tbody>
                  ${tableData}
                  </tbody>
              </table>
            </div>
          </div>

          <div>
            <p style="fontSize:18px;padding:1rem 0;fontWeight:600;">You can check uploaded document at</p> 
            <a href="https://drive.google.com/drive/folders/${folder}?usp=sharing">https://drive.google.com/drive/folders/${folder}?usp=sharing</a>
          </div>
          <div class="footer">
              <p>This message was sent by ${user.username}.</p>
          </div>
      </div>
  </body>
  </html>
`;

  var mailOptions = {
    from: process.env.INFO_EMAIL,
    to: process.env.MESSAGE_EMAIL,
    subject: `${user.username} has applied.`,
    html: emailContent,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending mail", error);
        reject(error);
      }
      resolve("send");
    });
  });
}

const emailFunctions = {
  resetPassword,
  confirmEmail,
  emailVerification,
  resendOTP,
  confirmRegistration,
  messagesEmail,
  applyEmail,
};
export default emailFunctions;
