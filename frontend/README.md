# Blog Frontend

Frontend application cho Blog API.

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

```bash
npm start
```

Frontend sẽ chạy tại `http://localhost:8080`

## Cấu hình API URL

Mặc định frontend sẽ gọi API tại `http://localhost:3000` (backend port).

Để thay đổi API URL, bạn có thể:
1. Sửa file `config.js` và thay đổi giá trị `API_URL`
2. Hoặc set biến `window.API_URL` trước khi load các file HTML

## Lưu ý

- Đảm bảo backend đang chạy trước khi sử dụng frontend
- Backend mặc định chạy tại port 3000
- Nếu backend chạy ở port khác, cần cập nhật `API_URL` trong `config.js`

