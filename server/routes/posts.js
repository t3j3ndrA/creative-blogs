const Post = require("../models/Posts");
const router = require("express").Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./featuredImage");
  },
  filename: (req, file, cb) => {
    try {
      cb(null, new Date().getDate().toString() + file.originalname);
    } catch (err) {
      cb(null, false);
    }
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const { author } = req.query;
  if (author) {
    try {
      const posts = await Post.find({ author });
      if (posts) res.status(200).json({ success: true, result: posts });
      else
        res.status(500).json({
          success: false,
          result: "you have no posts, create new now and share you ideas",
        });
    } catch (error) {
      res.status(500).json({ success: false, result: "could not get posts" });
    }
  }
  try {
    const allposts = await Post.find({});
    res.status(200).json({ success: true, result: allposts });
  } catch (err) {
    res.status(500).json({ success: false, result: "could not get posts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json({ success: true, result: post });
    }
    res.status(500).json({ success: false, result: "post does not exist" });
  } catch (err) {
    res.status(500).json({ success: false, result: "could not found post" });
  }
});

router.post(
  "/create-new-post",
  upload.single("featuredImage"),
  async (req, res) => {
    try {
      const { title, desc, content, author } = req.body;
      // checking duplicate posts with the same titles
      const duplicates = await Post.find({ title }).countDocuments();
      console.log(duplicates);
      if (duplicates > 0) {
        res.status(500).json({
          success: false,
          result: [
            "A post with the same title already exist, please change title",
          ],
        });
      }
      try {
        const post = await Post.create({
          title,
          author,
          desc,
          content,
          featuredImage: "http://localhost:5000/" + req.file.path,
        });
        console.log(post);
        res.status(200).json({ success: true, result: post });
      } catch (err) {
        res.status(500).json({ success: false, result: err });
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, result: "could not create new post" });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post._id) {
      res.status(200).json({ success: true, result: post });
    }
    res.status(500).json({ success: false, result: "post does not exist" });
  } catch (err) {
    res.status(500).json({ success: false, result: "could not delete post" });
  }
});

module.exports = router;
