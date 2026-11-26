# Thiệp mời đám cưới Hoàng & Lam

Dựa trên [juhonamnam/wedding-invitation](https://github.com/juhonamnam/wedding-invitation) (MIT), đã Việt hóa và dùng Google Maps (Đồng Hới, Quảng Trị).

## Chỉnh nội dung
Sửa [src/const.ts](src/const.ts): tên, ngày giờ, địa điểm, tọa độ, thông tin gia đình, số điện thoại, tài khoản.
Thay ảnh trong `src/images/` và `public/preview_image.png` (ảnh chia sẻ).

## Chạy local
```
npm install
npm run dev
```

## Deploy Vercel
Import repo vào Vercel — tự nhận Vite (`vercel.json`: build `npm run build`, output `build`). Không cần biến môi trường.
