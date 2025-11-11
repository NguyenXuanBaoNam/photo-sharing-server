const bcrypt = require("bcryptjs");

// Dữ liệu users (trong production nên dùng database)
const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10), // Mật khẩu: admin123
  },
  {
    id: 2,
    username: "user",
    password: bcrypt.hashSync("user123", 10), // Mật khẩu: user123
  },
];

// Tìm user theo username
const findUserByUsername = (username) => {
  return users.find((u) => u.username === username);
};

// Tìm user theo id
const findUserById = (id) => {
  return users.find((u) => u.id === id);
};

// So sánh password
const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  users,
  findUserByUsername,
  findUserById,
  comparePassword,
};

