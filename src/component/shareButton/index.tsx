import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { LazyDiv } from "../lazyDiv"

/**
 * Nút chia sẻ thiệp mời (Web Share API, nếu không hỗ trợ thì sao chép liên kết).
 */
export const ShareButton = () => {
  return (
    <LazyDiv className="footer share-button">
      <button
        className="share"
        onClick={async () => {
          const url = window.location.href
          const data = {
            title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME} – Thiệp mời đám cưới`,
            text: `${WEDDING_DATE.format(WEDDING_DATE_FORMAT)}\n${LOCATION}`,
            url,
          }
          try {
            if (navigator.share) {
              await navigator.share(data)
            } else {
              await navigator.clipboard.writeText(url)
              alert("Đã sao chép liên kết thiệp mời.")
            }
          } catch {
            // Người dùng hủy chia sẻ — bỏ qua
          }
        }}
      >
        Chia sẻ thiệp mời
      </button>
    </LazyDiv>
  )
}
