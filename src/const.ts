import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/vi"

// Cấu hình dayjs: UTC, múi giờ và ngôn ngữ tiếng Việt
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("vi")

export { dayjs }

/**
 * Thời gian tổ chức lễ cưới (múi giờ Việt Nam).
 * TODO: cập nhật ngày giờ thật.
 */
export const WEDDING_DATE = dayjs.tz("2026-12-12 11:00", "Asia/Ho_Chi_Minh")

/**
 * Định dạng hiển thị ngày giờ.
 * Ví dụ: 11:00 · Thứ bảy, ngày 12 tháng 12 năm 2026
 */
export const WEDDING_DATE_FORMAT = "HH:mm · dddd, [ngày] D [tháng] M [năm] YYYY"

/**
 * Các ngày lễ trong tháng cưới (hiển thị màu đỏ trên lịch).
 */
export const HOLIDAYS: number[] = []

/**
 * Tên địa điểm tổ chức. TODO: cập nhật tên nhà hàng/trung tâm tiệc cưới.
 */
export const LOCATION = "Nhà hàng Tiệc cưới Đồng Hới"

/**
 * Địa chỉ chi tiết
 */
export const LOCATION_ADDRESS = "Phường Đồng Hới, tỉnh Quảng Trị, Việt Nam"

/**
 * Tọa độ địa điểm [kinh độ, vĩ độ] — trung tâm TP. Đồng Hới.
 * TODO: thay bằng tọa độ chính xác (chuột phải trên Google Maps → copy tọa độ,
 * lưu ý Google hiển thị theo thứ tự [vĩ độ, kinh độ]).
 */
export const WEDDING_HALL_POSITION = [106.6223, 17.4689]

// Thông tin cô dâu
export const BRIDE_FULLNAME = "Lam"
export const BRIDE_FIRSTNAME = "Lam"
export const BRIDE_TITLE = "Con gái"
export const BRIDE_FATHER = "Nguyễn Văn A"
export const BRIDE_MOTHER = "Trần Thị B"

/**
 * Liên hệ & tài khoản nhà gái. Để trống phone/account nếu không muốn hiển thị.
 */
export const BRIDE_INFO = [
  {
    relation: "Cô dâu",
    name: BRIDE_FULLNAME,
    phone: "",
    account: "",
  },
  {
    relation: "Bố cô dâu",
    name: BRIDE_FATHER,
    phone: "",
    account: "",
  },
  {
    relation: "Mẹ cô dâu",
    name: BRIDE_MOTHER,
    phone: "",
    account: "",
  },
]

// Thông tin chú rể
export const GROOM_FULLNAME = "Hoàng"
export const GROOM_FIRSTNAME = "Hoàng"
export const GROOM_TITLE = "Con trai"
export const GROOM_FATHER = "Lê Văn C"
export const GROOM_MOTHER = "Phạm Thị D"

/**
 * Liên hệ & tài khoản nhà trai. Để trống phone/account nếu không muốn hiển thị.
 */
export const GROOM_INFO = [
  {
    relation: "Chú rể",
    name: GROOM_FULLNAME,
    phone: "",
    account: "",
  },
  {
    relation: "Bố chú rể",
    name: GROOM_FATHER,
    phone: "",
    account: "",
  },
  {
    relation: "Mẹ chú rể",
    name: GROOM_MOTHER,
    phone: "",
    account: "",
  },
]
