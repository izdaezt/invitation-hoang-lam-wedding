# Thiệp mời đám cưới Hoàng & Lam

Dựa trên [juhonamnam/wedding-invitation](https://github.com/juhonamnam/wedding-invitation) (MIT), đã Việt hóa và dùng Google Maps (Đồng Hới, Quảng Trị).

## Chỉnh nội dung
Sửa [src/config/wedding.json](src/config/wedding.json): tên, gia đình, số điện thoại, tài khoản (`common`) và ngày giờ, địa điểm, tọa độ, hướng dẫn di chuyển của từng trang (`pages`).
Các trang: `/nha-trai`, `/nha-gai`, `/cam-on`. Vào `/` sẽ tự chuyển tới lễ cưới gần nhất chưa qua, hết cả hai thì chuyển tới `/cam-on`.
Thay ảnh trong `src/images/` và `public/preview_image.png` (ảnh chia sẻ).

## Chạy local
```
npm install
npm run dev
```

## Deploy Vercel
Import repo vào Vercel — tự nhận Vite (`vercel.json`: build `npm run build`, output `build`). Không cần biến môi trường.
