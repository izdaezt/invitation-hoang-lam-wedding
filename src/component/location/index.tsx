import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS, TRANSPORT } from "../../const"
import CopyIcon from "../../icons/copy-icon.svg?react"
import { RichLines } from "../richText"
import { Fragment, useRef, useState } from "react"
import { copyText } from "../../utils/copy"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* Hướng dẫn di chuyển (lấy từ src/config/wedding.json) */}
      <LazyDiv className="card location">
        {TRANSPORT.map((section) => {
          const Icon = section.icon === "car" ? CarIcon : BusIcon
          return (
            <div
              className={"location-info" + (section.heading ? "" : " plain")}
              key={section.heading ?? section.blocks[0].lines[0]}
            >
              {section.heading && (
                <>
                  <div className="transportation-icon-wrapper">
                    <Icon className="transportation-icon" />
                  </div>
                  <div className="heading">{section.heading}</div>
                </>
              )}
              {section.blocks.map(({ lines, copy }, i) => (
                <Fragment key={i}>
                  {section.heading && <div />}
                  <div className={"content" + (copy ? " copyable" : "")}>
                    <div>
                      <RichLines lines={lines} />
                    </div>
                    {copy && <CopyButton text={copy} />}
                  </div>
                </Fragment>
              ))}
            </div>
          )
        })}
      </LazyDiv>
    </>
  )
}

/**
 * Nút sao chép; sau khi sao chép hiện thông báo "Đã sao chép" trong giây lát.
 */
const CopyButton = ({ text }: { text: string }) => {
  const [status, setStatus] = useState<"copied" | "failed" | null>(null)
  const timeout = useRef<number | null>(null)

  return (
    <button
      className="copy-button"
      aria-label="Sao chép"
      onClick={async () => {
        const ok = await copyText(text)
        setStatus(ok ? "copied" : "failed")
        if (timeout.current !== null) clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => setStatus(null), 2000)
      }}
    >
      <CopyIcon />
      {status && (
        <span className={"copy-toast " + status}>
          {status === "copied" ? "Đã sao chép" : "Sao chép thất bại"}
        </span>
      )}
    </button>
  )
}
