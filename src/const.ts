import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/vi"
import config from "./config/wedding.json"
import { canChi, solarToLunar } from "./utils/lunar"

// Cấu hình dayjs: UTC, múi giờ và ngôn ngữ tiếng Việt
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("vi")

export { dayjs }

/**
 * Toàn bộ dữ liệu đọc từ src/config/wedding.json — KHÔNG sửa ở đây,
 * hãy sửa file JSON.
 */
const { common, pages, thankYou } = config

/**
 * Chọn trang theo đường dẫn hiện tại.
 * - "/" hoặc đường dẫn lạ: tự chuyển tới trang có ngày cưới gần nhất chưa qua
 *   (tính hết ngày cưới); nếu đã qua hết thì chuyển tới trang cảm ơn.
 */
const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p)
const findPage = (path: string) =>
  pages.find((p) => normalize(p.path) === normalize(path))

const pickRedirectPath = () => {
  const now = dayjs()
  const upcoming = pages
    .map((p) => ({ p, date: dayjs.tz(p.date, common.timezone) }))
    .filter(({ date }) => !date.endOf("day").isBefore(now))
    .sort((a, b) => a.date.valueOf() - b.date.valueOf())[0]
  return upcoming ? upcoming.p.path : thankYou.path
}

let currentPath =
  typeof window !== "undefined" ? normalize(window.location.pathname) : "/"
if (
  typeof window !== "undefined" &&
  !findPage(currentPath) &&
  currentPath !== normalize(thankYou.path)
) {
  currentPath = normalize(pickRedirectPath())
  window.history.replaceState(null, "", currentPath)
}

/** true khi đang ở trang cảm ơn */
export const IS_THANK_YOU = currentPath === normalize(thankYou.path)
export const THANK_YOU = thankYou
const page = findPage(currentPath) ?? pages[0]

/** Tên miền dùng khi chia sẻ thiệp (không có dấu / ở cuối) */
export const SITE_URL = common.siteUrl.replace(/\/+$/, "")

export const PAGE = page

export const WEDDING_DATE = dayjs.tz(page.date, common.timezone)

const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** Giờ. Ví dụ: 11 giờ 00 */
export const WEDDING_TIME_TEXT = WEDDING_DATE.format("HH [giờ] mm")

/** Thứ. Ví dụ: Thứ bảy */
export const WEDDING_WEEKDAY_TEXT = upperFirst(WEDDING_DATE.format("dddd"))

/** Ngày dương lịch. Ví dụ: Ngày 12 tháng 12 năm 2026 */
export const WEDDING_SOLAR_TEXT = WEDDING_DATE.format(
  "[Ngày] D [tháng] M [năm] YYYY",
)

/** Ngày âm lịch. Ví dụ: Nhằm ngày 4 tháng 11 năm Bính Ngọ */
const lunar = solarToLunar(
  WEDDING_DATE.date(),
  WEDDING_DATE.month() + 1,
  WEDDING_DATE.year(),
)
export const WEDDING_LUNAR_TEXT = `Nhằm ngày ${lunar.day} tháng ${lunar.month}${
  lunar.leap ? " nhuận" : ""
} năm ${canChi(lunar.year)}`

/** Thứ, ngày tháng năm. Ví dụ: Thứ bảy, ngày 12 tháng 12 năm 2026 */
export const WEDDING_DAY_TEXT = upperFirst(
  WEDDING_DATE.format("dddd, [ngày] D [tháng] M [năm] YYYY"),
)

/** Ngày giờ trên một dòng, dùng ở những nơi chỉ có 1 dòng */
export const WEDDING_DATE_TEXT = `${WEDDING_TIME_TEXT} · ${WEDDING_DAY_TEXT}`

/** Các ngày lễ trong tháng cưới (hiển thị màu đỏ trên lịch). */
export const HOLIDAYS: number[] = page.holidays

export const LOCATION = page.location.name
export const LOCATION_ADDRESS = page.location.address

/** Tọa độ [kinh độ, vĩ độ] — tùy chọn, nếu không có thì bản đồ tìm theo tên + địa chỉ */
export const WEDDING_HALL_POSITION: [number, number] | null =
  "lat" in page.location && "lng" in page.location
    ? [
        (page.location as { lng: number }).lng,
        (page.location as { lat: number }).lat,
      ]
    : null

export const MEAL = page.meal
type TransportBlock = string[] | { lines: string[]; copy?: string }
type TransportSection = {
  icon?: string
  heading?: string
  blocks: TransportBlock[]
}

// Thay {name} / {address} bằng tên / địa chỉ của địa điểm
const fillTokens = (text: string) =>
  text
    .replace(/\{name\}/g, page.location.name)
    .replace(/\{address\}/g, page.location.address)

/** Hướng dẫn di chuyển; mỗi ô có `lines` và (tùy chọn) `copy` để hiện nút sao chép */
export const TRANSPORT = (page.transport as TransportSection[]).map(
  (section) => ({
    ...section,
    blocks: section.blocks.map((block) => {
      const { lines, copy } = Array.isArray(block)
        ? { lines: block, copy: undefined }
        : block
      return {
        lines: lines.map(fillTokens),
        copy: copy ? fillTokens(copy) : undefined,
      }
    }),
  }),
)
export const DONATION_TITLES: string[] = common.donationTitles
export const DONATION_VERSES: string[][] = common.donationVerses
export const INVITATION: string[][] =
  (page as { invitation?: string[][] }).invitation ?? common.invitation

export const BRIDE_FULLNAME = common.bride.fullName
export const BRIDE_FIRSTNAME = common.bride.firstName
export const BRIDE_TITLE = common.bride.title
export const BRIDE_FATHER = common.bride.father
export const BRIDE_MOTHER = common.bride.mother
export const BRIDE_INFO = common.bride.contacts

export const GROOM_FULLNAME = common.groom.fullName
export const GROOM_FIRSTNAME = common.groom.firstName
export const GROOM_TITLE = common.groom.title
export const GROOM_FATHER = common.groom.father
export const GROOM_MOTHER = common.groom.mother
export const GROOM_INFO = common.groom.contacts
