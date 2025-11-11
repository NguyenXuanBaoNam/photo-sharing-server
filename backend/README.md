# Blog Backend

Backend API cho Blog Application sử dụng Node.js và Express.

## Cài đặt

```bash
npm install
```

## Chạy server

```bash
npm start
```

Backend sẽ chạy tại `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/login` - Đăng nhập
  - Body: `{ username: string, password: string }`
  - Response: `{ token: string, user: object }`

### Blog Posts
- `GET /api/blogs` - Lấy danh sách bài viết
- `GET /api/blogs/:slug` - Lấy chi tiết bài viết theo slug
- `POST /api/post` - Tạo bài viết mới (Protected - cần token)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ slug: string, title: string, description: string }`

## Tài khoản mặc định

- Username: `admin` / Password: `admin123`
- Username: `user` / Password: `user123`

## Environment Variables

- `PORT` - Port để chạy server (mặc định: 3000)
- `JWT_SECRET` - Secret key cho JWT (mặc định: "your-secret-key-change-in-production")

