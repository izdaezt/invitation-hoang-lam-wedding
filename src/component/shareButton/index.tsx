import { useState } from "react"
import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  PAGE,
  SITE_URL,
  WEDDING_DATE_TEXT,
} from "../../const"
import { copyText } from "../../utils/copy"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { Modal } from "../modal"

// Điện thoại / máy tính bảng (iPadOS báo là Macintosh nhưng có màn hình cảm ứng)
const isMobile =
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1)

/**
 * Nút chia sẻ thiệp mời.
 * - Điện thoại: mở bảng chia sẻ của hệ thống (Zalo, Messenger, Facebook, SMS...).
 * - Máy tính (hoặc khi bảng hệ thống lỗi): mở hộp thoại chọn ứng dụng để chia sẻ.
 */
export const ShareButton = () => {
  const modalState = useState(false)
  const [copied, setCopied] = useState(false)

  // Link chia sẻ: tên miền chính + đường dẫn của trang đang xem
  const url = SITE_URL + PAGE.path
  const title = `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME} – Thiệp mời đám cưới`
  const text = `${WEDDING_DATE_TEXT}\n${LOCATION}`

  const eUrl = encodeURIComponent(url)
  const eText = encodeURIComponent(`${title}\n${text}`)

  const options = [
    {
      label: "Messenger",
      href: isMobile
        ? `fb-messenger://share?link=${eUrl}`
        : `https://www.facebook.com/sharer/sharer.php?u=${eUrl}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${eUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${eUrl}&text=${eText}`,
    },
    {
      label: "Tin nhắn SMS",
      href: `sms:?&body=${encodeURIComponent(`${title}\n${url}`)}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    },
  ]

  return (
    <>
      <LazyDiv className="footer share-button">
        <Button
          className="share"
          onClick={async () => {
            // Chỉ dùng bảng chia sẻ của hệ thống trên điện thoại; máy tính dùng hộp thoại bên dưới
            if (isMobile && navigator.share) {
              try {
                await navigator.share({ title, text, url })
                return
              } catch (e) {
                // Người dùng chủ động hủy thì không mở hộp thoại nữa
                if (e instanceof DOMException && e.name === "AbortError") return
              }
            }
            setCopied(false)
            modalState[1](true)
          }}
        >
          Chia sẻ thiệp mời
        </Button>
      </LazyDiv>

      <Modal
        modalState={modalState}
        className="share-modal"
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title">Chia sẻ thiệp mời</div>
        </div>
        <div className="content">
          <div className="link">{url}</div>
          <Button
            buttonStyle="style2"
            onClick={async () => {
              const ok = await copyText(url)
              setCopied(ok)
              if (!ok) alert("Sao chép thất bại.")
            }}
          >
            {copied ? "Đã sao chép liên kết" : "Sao chép liên kết"}
          </Button>
          {options.map(({ label, href }) => (
            <Button
              key={label}
              buttonStyle="style2"
              onClick={() => window.open(href, isMobile ? "_self" : "_blank")}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => modalState[1](false)}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  )
}
