# Lab 3: Photo App với MongoDB

Ứng dụng Photo App sử dụng Node.js, Express, MongoDB và Mongoose.

## Cài đặt

1. Cài đặt dependencies:
```bash
cd lab3
npm install
```

2. Cấu hình MongoDB:
   - Tạo MongoDB Atlas account hoặc sử dụng MongoDB local
   - Cập nhật `MONGODB_URI` trong `server.js` và `db/dbLoad.js`
   - Hoặc set environment variable: 
     - Windows: `set MONGODB_URI="your-mongodb-connection-string"`
     - Linux/Mac: `export MONGODB_URI="your-mongodb-connection-string"`

3. Load dữ liệu vào database:
```bash
npm run load-db
```

4. Chạy server:
```bash
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## Lưu ý

- Đảm bảo MongoDB đã được cài đặt và chạy trước khi start server
- Nếu sử dụng MongoDB Atlas, copy connection string và paste vào `MONGODB_URI`
- Script `dbLoad.js` sẽ xóa toàn bộ dữ liệu cũ trước khi load dữ liệu mới

## API Endpoints

### Backend APIs

- `GET /user/list` - Lấy danh sách users với count bubbles (photo_count, comment_count)
- `GET /user/:id` - Lấy thông tin chi tiết của user
- `GET /photosOfUser/:id` - Lấy photos của user kèm comments
- `GET /user/:id/comments` - Lấy tất cả comments của user (Extra Credit)

## Cấu trúc thư mục

```
lab3/
├── db/
│   ├── userModel.js       # Mongoose schema cho User
│   ├── photoModel.js      # Mongoose schema cho Photo
│   ├── schemaInfo.js      # Mongoose schema cho SchemaInfo
│   └── dbLoad.js          # Script để load data vào MongoDB
├── modelData/
│   └── models.js          # Dữ liệu mẫu
├── lib/
│   └── fetchModelData.js  # Function để fetch data từ backend
├── components/
│   ├── UserList/          # Component hiển thị danh sách users
│   ├── UserDetail/        # Component hiển thị chi tiết user
│   ├── UserPhotos/        # Component hiển thị photos của user
│   └── UserComments/      # Component hiển thị comments của user (Extra Credit)
├── server.js              # Backend server
└── package.json
```

## Extra Credit

- Count bubbles: Hiển thị số photos (màu xanh) và số comments (màu đỏ) bên cạnh mỗi user trong danh sách
- Comments view: Click vào comment count bubble để xem tất cả comments của user, có thể click vào comment hoặc photo để chuyển đến photo detail view

