import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import dashboard from "./Router/dashboard.js";
import optionRoute from "./Router/filterOptions.js";
import sidebarOption from "./Router/sidebarData.js";
import coursesRouter from "./Router/coursesRouter.js";
import registerRouter from "./Router/register.js";
import loginRouter from "./Router/login.js";
import logoutRouter from "./Router/logout.js";
import authRouter from "./Router/authRoute.js";
import getMessages from './Router/getMessages.js'
import emailRouter from "./Router/emailRouter.js";
import faqRouter from "./Router/faqs.js";
import userInfoRouter from "./Router/userInfo.js";
import messageRouter from "./Router/message.js";
import blogRouter from "./Router/blogRouter.js";
import courseEdit from "./Router/editCourse.js";
import faqEdit from "./Router/editFaq.js";
import adminProfile from "./Router/profile.js";
import listRouter from "./Router/dataList.js";
import adminLogin from "./Router/adminLogin.js";
import googleAuthRouter from "./Router/googleAuth.js";
import userRouter from "./Router/userRouter.js";
import cartRouter from "./Router/cart.js";
import resetPwdRouter from "./Router/resetPassword.js";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import jobRouter from './Router/jobRouter.js'
import uploadRouter from './Router/uploadFileRouter.js'
import passport from "passport";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import scheduleRouter from "./Router/scheduleRouter.js";
import User from "./Models/User.js";
import mongoStore from "connect-mongo";
import isAuthenticated from "./Middleware/userAuthentication.js";
import sitemapRouter from './Router/sitemapRouter.js'
import IPWhitelistMiddleware from "./Middleware/ipMiddleware.js";
import validateURL from "./Middleware/validateURL.js";
import adminAuthenticated from "./Middleware/adminAuthentication.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors({ credentials: true, origin: true }));

dotenv.config();
const port = process.env.PORT;

app.enable("trust proxy")
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "course finder",
    store: new mongoStore({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname));

// Client Routes

app.use("/api/user/info",validateURL, isAuthenticated, userInfoRouter);
app.use("/api/list",validateURL, listRouter);
app.get("/api/filter",validateURL, optionRoute);
app.get("/api/sidebar/data",validateURL, sidebarOption);
app.use("/api/courses",validateURL, coursesRouter);
app.post("/api/user/register",validateURL, registerRouter);
app.post("/api/user/login",validateURL, loginRouter);
app.get("/api/logout",validateURL, logoutRouter);
app.use("/api/auth/google", googleAuthRouter);
app.use("/api/authenticate",validateURL, authRouter);
app.use("/api/faqs",validateURL, faqRouter);
app.use("/api/cart",validateURL, isAuthenticated, cartRouter);
app.use("/api/message",validateURL, messageRouter);
app.use("/api/email",validateURL, emailRouter);
app.use("/api/schedule/meeting",validateURL, scheduleRouter);
app.post("/api/user/reset/password",validateURL, resetPwdRouter);
app.use("/api/job",validateURL, jobRouter);
app.use("/api/upload",validateURL,uploadRouter)

// Admin Routes

app.post("/api/admin/login",validateURL, adminLogin);
app.get("/api/dashboard",validateURL, adminAuthenticated, dashboard);
app.use("/api/admin/courses",validateURL, adminAuthenticated, courseEdit);
app.use("/api/user",validateURL, adminAuthenticated, userRouter);
app.use("/api/admin/messages",validateURL,adminAuthenticated, getMessages)
app.get("/api/admin/profile",validateURL, adminAuthenticated, adminProfile);
app.use("/api/admin/faq",validateURL, adminAuthenticated, faqEdit);
app.use("/api/admin/blog",validateURL, adminAuthenticated, blogRouter);

// Sitemap Routes

app.use("/api/sitemap",sitemapRouter)

// Error Handlers

app.use(function(req,res){
  res.status(404).send("Page not found.")
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(app.listen(port), console.log("Mongoose Connected"));
