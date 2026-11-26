/**
 * URL backend (dùng cho sổ lưu bút / xác nhận tham dự). Tùy chọn.
 */
export const SERVER_URL = import.meta.env.VITE_SERVER_URL

/**
 * Chế độ trang tĩnh: ẩn các tính năng cần backend (sổ lưu bút...).
 * Mặc định BẬT (phù hợp deploy Vercel không backend);
 * đặt VITE_STATIC_ONLY=false để tắt.
 */
export const STATIC_ONLY = import.meta.env.VITE_STATIC_ONLY !== "false"
