const router = require("express").Router();
const User = require("../models/Users");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profileImage");
  },
  filename: (req, file, cb) => {
    try {
      cb(null, new Date().getTime().toString() + file.originalname);
    } catch (err) {
      cb(null, false);
    }
  },
});

const upload = multer({ storage });

router.get("/:name/:password", async (req, res) => {
  const name = req.params.name;
  const password = req.params.password;
  // console.log(req.params);
  // console.log(name, password);

  try {
    if (name && password) {
      const foundUser = await User.find({ name: name, password: password });
      console.log(foundUser);
      if (foundUser.length) {
        res.status(200).json({ success: true, result: foundUser });
      } else
        res.status(200).json({ success: false, result: "wrong credentials" });
    } else {
      res.status(200).json({ success: false, result: "fieds cannot be empty" });
    }
  } catch (err) {
    res.status(200).json({ success: false, result: { err } });
  }
});

router.post("/", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.create({
      name,
      password,
      profileImage: "http://localhost:5000/" + req.file.path,
    });
    res.status(200).json({ success: true, result: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, result: { err } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ success: true, result: user });
    } else {
      res.status(500).json({ success: false, result: "Could not found User" });
    }
  } catch (err) {
    res.status(500).json({ success: false, result: err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, password } = req.body;
  try {
    if (name) {
      const user = await User.findByIdAndUpdate(id, { name });
    }
    if (password) {
      try {
        const user = await User.findByIdAndUpdate(id, {
          password,
        });
      } catch (err) {}
    }

    res
      .status(200)
      .json({ success: true, result: "Informations updated Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, result: "technical error" });
  }
});

module.exports = router;

// 95370 08737
