const CourseKeywords = (course_name="",institute_name="",address="")=>{
    address = address.replaceAll(",","");
    institute_name = institute_name.replaceAll(",","")
    course_name = course_name.replaceAll(",",",")
    const keywords = [
        `${course_name}`,
        `${institute_name}`,
        `${address}`,
        `${course_name} ${institute_name}`,
        `${course_name} ${address}`,
        `${course_name} ${address} ${institute_name}`,
        "myglobalconsultant courses",
        "study abroad",
        "overseas courses",
        "study abroad consultancy"
    ]

    return keywords.join(", ");
}

export default CourseKeywords;