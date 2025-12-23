import mongoose from "mongoose";

let CourseSchema = new mongoose.Schema({
    "Country" : String,
    "URL": String,
    "Institute_Name": String,
    "Institut_Logo": String,
    "Full_Address": String,
    "Ranking": String,
    "Website_Link": String,
    "Course_Name": String,
    "Intakes": String,
    "Duration": String,
    "Campus": String,
    "Course_Url": String,
    "Yearly_Tuition_Fees": String,
    "Application_Fees": String,
    "Application_Deadline": String,
    "PTE_Overall": String,
    "PTE_No_Bands_Less_Than": String,
    "TOEFL_iBT_Overall": String,
    "TOEFL_iBT_no_Bands_Less_Than": String,
    "IELTS_Overall": String,
    "IELTS_no_Band_Less_Than": String,
    "GRE_Score": String,
    "GMAT_Score": String,
    "ACT_Score": String,
    "SAT_Score": String,
    "DET_Score": String,
    "GPA": String,
    "Remarks": String,
});

const Courses = mongoose.model('courses', CourseSchema);

export default Courses;