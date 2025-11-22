// Dữ liệu mẫu cho photo app
const models = {
  users: [
    {
      _id: "507f1f77bcf86cd799439011",
      first_name: "Nguyễn",
      last_name: "Văn A",
      location: "Hà Nội",
      description: "Nhiếp ảnh gia chuyên nghiệp",
      occupation: "Photographer",
    },
    {
      _id: "507f1f77bcf86cd799439012",
      first_name: "Trần",
      last_name: "Thị B",
      location: "TP.HCM",
      description: "Yêu thích chụp ảnh phong cảnh",
      occupation: "Designer",
    },
    {
      _id: "507f1f77bcf86cd799439013",
      first_name: "Lê",
      last_name: "Văn C",
      location: "Đà Nẵng",
      description: "Du lịch và chụp ảnh",
      occupation: "Traveler",
    },
  ],
  photos: [
    {
      _id: "507f1f77bcf86cd799439021",
      user_id: "507f1f77bcf86cd799439011",
      file_name: "photo1.jpg",
      date_time: "2024-01-15T10:00:00Z",
      comments: [
        {
          _id: "507f1f77bcf86cd799439031",
          comment: "Ảnh đẹp quá!",
          date_time: "2024-01-15T11:00:00Z",
          user: {
            _id: "507f1f77bcf86cd799439012",
            first_name: "Trần",
            last_name: "Thị B",
          },
        },
        {
          _id: "507f1f77bcf86cd799439032",
          comment: "Tuyệt vời!",
          date_time: "2024-01-15T12:00:00Z",
          user: {
            _id: "507f1f77bcf86cd799439013",
            first_name: "Lê",
            last_name: "Văn C",
          },
        },
      ],
    },
    {
      _id: "507f1f77bcf86cd799439022",
      user_id: "507f1f77bcf86cd799439011",
      file_name: "photo2.jpg",
      date_time: "2024-01-16T10:00:00Z",
      comments: [
        {
          _id: "507f1f77bcf86cd799439033",
          comment: "Rất đẹp!",
          date_time: "2024-01-16T11:00:00Z",
          user: {
            _id: "507f1f77bcf86cd799439012",
            first_name: "Trần",
            last_name: "Thị B",
          },
        },
      ],
    },
    {
      _id: "507f1f77bcf86cd799439023",
      user_id: "507f1f77bcf86cd799439012",
      file_name: "photo3.jpg",
      date_time: "2024-01-17T10:00:00Z",
      comments: [],
    },
    {
      _id: "507f1f77bcf86cd799439024",
      user_id: "507f1f77bcf86cd799439013",
      file_name: "photo4.jpg",
      date_time: "2024-01-18T10:00:00Z",
      comments: [
        {
          _id: "507f1f77bcf86cd799439034",
          comment: "Ảnh phong cảnh đẹp!",
          date_time: "2024-01-18T11:00:00Z",
          user: {
            _id: "507f1f77bcf86cd799439011",
            first_name: "Nguyễn",
            last_name: "Văn A",
          },
        },
      ],
    },
  ],
  schemaInfo: {
    version: 1,
  },
};

module.exports = models;


