const mongoose = require("mongoose");
const User = require("./userModel");
const Photo = require("./photoModel");
const SchemaInfo = require("./schemaInfo");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/photoapp";

async function loadDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Đã kết nối MongoDB");

    await User.deleteMany({});
    await Photo.deleteMany({});
    await SchemaInfo.deleteMany({});

    const modelData = require("../modelData/models");

    const users = modelData.users.map((u) => ({
      _id: new mongoose.Types.ObjectId(u._id),
      first_name: u.first_name,
      last_name: u.last_name,
      location: u.location,
      description: u.description,
      occupation: u.occupation,
    }));
    await User.insertMany(users);
    console.log(`Đã load ${users.length} users`);

    const photos = modelData.photos.map((p) => ({
      _id: new mongoose.Types.ObjectId(p._id),
      user_id: new mongoose.Types.ObjectId(p.user_id),
      file_name: p.file_name,
      date_time: new Date(p.date_time),
      comments: p.comments.map((c) => ({
        comment: c.comment,
        date_time: new Date(c.date_time),
        _id: new mongoose.Types.ObjectId(c._id),
        user: {
          _id: new mongoose.Types.ObjectId(c.user._id),
          first_name: c.user.first_name,
          last_name: c.user.last_name,
        },
      })),
    }));
    await Photo.insertMany(photos);
    console.log(`Đã load ${photos.length} photos`);

    await SchemaInfo.create({ version: modelData.schemaInfo.version });
    console.log("Hoàn thành load database!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("Lỗi:", error);
    process.exit(1);
  }
}

loadDatabase();


