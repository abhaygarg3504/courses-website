const SearchKeywords = (course_name = "", country = "") => {
  const keywords = [
    `${course_name}`,
    `${country}`,
    `${course_name} ${country}`,
    `${course_name} in ${country}`,
    "myglobalconsultant courses",
    "study abroad",
    "overseas courses",
    "study abroad consultancy",
    "Educational consultants",
    "Study abroad guidance",
    "International student support",
    "Study abroad resources",
    "Applying to study abroad",
  ];

  return keywords.join(", ");
};

export default SearchKeywords;
