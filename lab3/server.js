const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./db/userModel");
const Photo = require("./db/photoModel");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/photoapp";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Đã kết nối MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

const PORT = process.env.PORT || 3000;

// API: /user/list
app.get("/user/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name").lean();
    
    // Thêm count (Extra Credit)
    const result = await Promise.all(
      users.map(async (user) => {
        const photoCount = await Photo.countDocuments({ user_id: user._id });
        const allPhotos = await Photo.find({}).lean();
        let commentCount = 0;
        allPhotos.forEach((photo) => {
          photo.comments.forEach((comment) => {
            if (String(comment.user._id) === String(user._id)) {
              commentCount++;
            }
          });
        });
        return { ...user, photo_count: photoCount, comment_count: commentCount };
      })
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API: /user/:id
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "_id first_name last_name location description occupation").lean();
    if (!user) return res.status(400).json({ error: "Không tìm thấy user" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "ID không hợp lệ" });
  }
});

// API: /photosOfUser/:id
app.get("/photosOfUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ error: "Không tìm thấy user" });
    
    const photos = await Photo.find({ user_id: req.params.id }).lean();
    const result = photos.map((photo) => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map((c) => ({
        _id: c._id,
        comment: c.comment,
        date_time: c.date_time,
        user: { _id: c.user._id, first_name: c.user.first_name, last_name: c.user.last_name },
      })),
    }));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "ID không hợp lệ" });
  }
});

// API: /user/:id/comments (Extra Credit)
app.get("/user/:id/comments", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ error: "Không tìm thấy user" });
    
    const allPhotos = await Photo.find({}).lean();
    const result = [];
    allPhotos.forEach((photo) => {
      photo.comments.forEach((comment) => {
        if (String(comment.user._id) === String(req.params.id)) {
          result.push({
            _id: comment._id,
            comment: comment.comment,
            date_time: comment.date_time,
            photo: { _id: photo._id, file_name: photo.file_name, user_id: photo.user_id },
          });
        }
      });
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "ID không hợp lệ" });
  }
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});

