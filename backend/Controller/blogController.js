import Blog from "../Models/Blog.js";

async function blogPost(req, res) {
  const { title, tags, thumbnail, description, blog } = req.body;
  if(Object.keys(req.body).length){
      try {
        const oldBlog = await Blog.findOne({ title: title });
        if (oldBlog) {
          res.status(200).json({ success: false, message: "Title already exist" });
          return;
        }
        let tagArray = tags.split(",").filter((arr) => {
          return arr !== "";
        });
        const newBlog = await Blog.create({
          title,
          tags: tagArray,
          thumbnail,
          description,
          blog,
        });
        res.status(200).json({ success: true, message: "Blog posted" });
      } catch (error) {
        console.log("Error in posting blog", error);
        res.status(400).json({ message: "Internal server Error" });
      }
  }
  else{
    res.status(400).json({ message: "Internal server Error" });
  }
}

const blogController = { blogPost };

export default blogController;
