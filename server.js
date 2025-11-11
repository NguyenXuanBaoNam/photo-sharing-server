const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const BlogPosts = require("./BlogPosts");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { authenticateToken, generateToken } = require("./auth");
const {
  findUserByUsername,
  comparePassword,
} = require("./users");

// PARSE JSON BODY
app.use(express.json());
app.use(cors());

// PORT CỦA CODESANDBOX
const PORT = process.env.PORT || 3000;

// SERVE FILE TĨNH
app.use(express.static(path.join(__dirname, "public")));

// API: LOGIN
app.post("/api/login", jsonParser, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username và password là bắt buộc" });
    }

    const user = findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Username hoặc password không đúng" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Username hoặc password không đúng" });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API: DANH SÁCH BLOG (sử dụng BlogPosts)
app.get("/api/blogs", (req, res) => {
  console.log("API /api/blogs được gọi");
  const list = BlogPosts.BlogPosts.map((b) => ({
    slug: b.slug,
    title: b.title,
    description: b.description,
    author: b.author,
    date: b.date,
  }));
  res.json(list);
});

// API: CHI TIẾT BLOG (sử dụng BlogPosts)
app.get("/api/blogs/:slug", (req, res) => {
  console.log("Tìm blog slug:", req.params.slug);
  const blog = BlogPosts.BlogPosts.find((b) => b.slug === req.params.slug);
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  res.json(blog);
});

// API: TẠO BÀI VIẾT MỚI (Protected Route)
app.post("/api/post", jsonParser, authenticateToken, (req, res) => {
  const { slug, title, description } = req.body;

  if (!slug || !title || !description) {
    return res.status(400).json({ error: "Slug, title và description là bắt buộc" });
  }

  // Kiểm tra slug đã tồn tại chưa
  const existingPost = BlogPosts.BlogPosts.find((p) => p.slug === slug);
  if (existingPost) {
    return res.status(400).json({ error: "Slug đã tồn tại" });
  }

  const newPost = {
    id: BlogPosts.BlogPosts.length + 1,
    slug,
    title,
    description,
    content: description, // Mặc định content = description
    author: req.user.username,
    date: new Date().toISOString().split("T")[0],
  };

  BlogPosts.BlogPosts.push(newPost);
  res.status(200).send({ message: "Posted successful" });
});

// FALLBACK: PHẢI Ở CUỐI CÙNG
app.get("*", (req, res) => {
  console.log("Fallback: Trả index.html");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/blogs`);
});
