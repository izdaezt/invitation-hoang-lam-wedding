import { BRIDE_FULLNAME, GROOM_FULLNAME, THANK_YOU } from "../../const"
import { LazyDiv } from "../lazyDiv"
import "./index.scss"

/**
 * Trang cảm ơn hiển thị sau khi tất cả các lễ cưới đã diễn ra.
 */
export const ThankYou = () => (
  <LazyDiv className="card thank-you">
    <h2 className="english">Thank You</h2>
    <div className="title">{THANK_YOU.title}</div>
    <div className="break" />
    {THANK_YOU.lines.map((line, i) => (
      <div className="content" key={i}>
        {line}
      </div>
    ))}
    <div className="break" />
    <div className="names">
      {GROOM_FULLNAME} ❤️ {BRIDE_FULLNAME}
    </div>
  </LazyDiv>
)
