import { google } from "googleapis";
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import { dirname, join } from "path";
import User from "../Models/User.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import Cart from "../Models/Cart.js";
import Call from "../Models/Schedules.js";
import emailFunctions from "./emailController.js";

const credentialsPath = path.join(__dirname, "../credentials.json");
const tokenPath = path.join(__dirname, "../token.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

async function uploadController(req, res) {
  const files = req.files;
  if (!files || files.length === 0) {
    return res
      .status(400)
      .send({ success: false, message: "No File were uploaded." });
  }
  try {
    const email = req.session.passport.user;
    const user = await User.findOne({ email: email });
    const folderName = user.username + "-" + new Date().toDateString();
    const credentials = fs.readFileSync(credentialsPath);
    const auth = await authorize(JSON.parse(credentials));
    const folder = await createFolder(auth, folderName);
    for (const file of files) {
      const uploadedFileDetails = {
        metaname: file.fieldname,
        name: file.filename,
        mimeType: file.mimetype,
        buffer: file.buffer,
      };
      await uploadFileToDrive(auth, folder, uploadedFileDetails);
    }
    await createSchedule(user,folder);
    res.status(200).send("File uploaded successfully");
  } catch (err) {
    res.status(400).send("Some Internal error occur");
  }
}

async function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[1]
  );

  return new Promise((resolve, reject) => {
    try {
      const token = fs.readFileSync(tokenPath);
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    } catch (error) {
      console.log("Error in authrozization", error);
      reject(error);
    }
  });
}

async function createFolder(auth, folderName) {
  return new Promise(async (resolve, reject) => {
    const drive = google.drive({ version: "v3", auth });
    try {
      const folder = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          parents: ["130oPuuyA4gYpVDUyvt8RKmTc8ZjIkn67"],
        },
      });
      resolve(folder.data.id);
    } catch (err) {
      console.log("Error in creting folder", err);
      reject(err);
    }
  });
}

async function uploadFileToDrive(auth, folderId, uploadedFileDetails) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth });
    try {
      const fileMetadata = {
        name: uploadedFileDetails.metaname,
        parents: [folderId],
      };
      const media = {
        mimeType: uploadedFileDetails.mimeType,
        body: fs.createReadStream("./TmpDocuments/" + uploadedFileDetails.name),
      };
      drive.files.create(
        {
          resource: fileMetadata,
          media: media,
          fields: "id",
        },
        async (err, file) => {
          if (err) {
            console.log("Error in uploading file", err);
            reject(err);
          } else {
            fs.unlinkSync(`./TmpDocuments/${uploadedFileDetails.name}`);
            resolve("success");
          }
        }
      );
    } catch (err) {
      console.error("Error uploading file:", err.message);
      reject(err);
    }
  });
}

async function createSchedule(user,folder) {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await Cart.findOne({ user: user._id.toString() }).populate(
        "courses"
      );
      const call = await Call.findOne({userId:user._id,reason:"Applied"});
      if(call){
        await Call.deleteOne({userId:user._id,reason:"Applied"})
      }
      const newSchedule = await Call.create({
        userId: user._id,
        country: user.country,
        number: user.number,
        cartId: cart._id,
        reason : "Applied"
      });
      emailFunctions.applyEmail(user, newSchedule, cart.courses, folder);
      resolve("success");
    } catch (error) {
      console.log("Error in creating applying schedule", error);
      reject(error);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) throw err;
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", tokenPath);
      });
      return oAuth2Client;
    });
  });
}

async function callback(req, res) {
  res.send({ status: "verified", code: req.query.code });
}

const uploadRoutes = { uploadController, callback };

export default uploadRoutes;
