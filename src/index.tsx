import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ModalProvider } from "./component/modal"
import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  IS_THANK_YOU,
  LOCATION,
  WEDDING_DATE_TEXT,
} from "./const"

// Cập nhật tiêu đề tab theo trang hiện tại
document.title = IS_THANK_YOU
  ? `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME} – Cảm ơn`
  : `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME} – Thiệp mời đám cưới`
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute(
    "content",
    `${WEDDING_DATE_TEXT} – ${LOCATION}`,
  )

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
)
