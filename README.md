# Blog Application

Ứng dụng Blog được tách thành 2 project riêng biệt: Backend và Frontend.

## Cấu trúc dự án

```
.
├── backend/          # Backend API (Node.js + Express)
├── frontend/         # Frontend (HTML + JavaScript)
└── README.md
```

## Cài đặt và chạy

### Backend

```bash
cd backend
npm install
npm start
```

Backend sẽ chạy tại `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend sẽ chạy tại `http://localhost:8080`

## Tài khoản đăng nhập

- Username: `admin` / Password: `admin123`
- Username: `user` / Password: `user123`

## Lưu ý

1. Chạy backend trước khi chạy frontend
2. Nếu backend chạy ở port khác 3000, cần cập nhật `API_URL` trong `frontend/config.js`
3. Backend sử dụng CORS để cho phép frontend gọi API

## API Endpoints

### Authentication
- `POST /api/login` - Đăng nhập

### Blog Posts
- `GET /api/blogs` - Danh sách bài viết
- `GET /api/blogs/:slug` - Chi tiết bài viết
- `POST /api/post` - Tạo bài viết mới (Protected)

Xem chi tiết trong `backend/README.md` và `frontend/README.md`
