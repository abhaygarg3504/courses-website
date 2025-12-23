import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Course from "./Pages/Course";
import Faqs from "./Pages/Faqs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Messages from "./Admin/Messages";
import Student from "./Admin/Student";
import AddCourse from "./Admin/AddCourse";
import EditCourse from "./Admin/EditCourse";
import AddFaq from "./Admin/AddFaq";
import EditFaq from "./Admin/EditFaq";
import CourseData from "./Admin/Components/CourseData";
import Profile from "./Admin/Profile";
import Cart from "./Pages/Cart";
import ScrollToTop from "./Components/ScrollToTop";
import ConfirmEmail from "./Pages/ConfirmEmail";
import Apply from "./Pages/Apply";
import ScheduleCall from "./Pages/ScheduleCall";
import AddNumber from "./Pages/AddNumber";
import Blogs from "./Pages/Blogs";
import Blog from "./Pages/Blog";
import Jobs from "./Pages/Jobs";
import EditBlog from "./Admin/EditBlog";
import EditJob from "./Admin/EditJob";
import PostJob from "./Admin/PostJob";
import PostBlog from "./Admin/PostBlog";
import AllBlogs from "./Admin/Blogs";
import ApplicationForm from "./Pages/ApplicationForm";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="course/:id" element={<Course />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget" element={<ForgetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="email-confirmation" element={<ConfirmEmail />} />
          <Route path="apply" element={<Apply />} />
          <Route path="schedule-call" element={<ScheduleCall />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:name" element={<Blog />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="application-form" element={<ApplicationForm />} />
          <Route path="add-number" element={<AddNumber />} />
          <Route path="*" element={<Error />} />
        </Route>

        {/* Admin Routes */}


        <Route path="/auth" element={<AdminLayout />}>
          <Route index element={<AdminLogin/>}/>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="student" element={<Student />} />
          <Route path="add/course" element={<AddCourse />} />
          <Route path="edit/course" element={<EditCourse />} />
          <Route path="edit/blog" element={<EditBlog />} />
          <Route path="edit/job" element={<EditJob />} />
          <Route path="all/blogs" element={<AllBlogs />} />
          <Route path="post/job" element={<PostJob />} />
          <Route path="post/blog" element={<PostBlog />} />
          <Route path="add/faq" element={<AddFaq />} />
          <Route path="edit/faq" element={<EditFaq />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit/course/data" element={<CourseData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
