import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_LUNAR_TEXT,
  WEDDING_SOLAR_TEXT,
  WEDDING_TIME_TEXT,
  WEDDING_WEEKDAY_TEXT,
} from "../../const"
import { COVER_IMAGE } from "../../images"
import HeartIcon from "../../icons/heart-icon.svg?react"
import ClockIcon from "../../icons/clock-icon.svg?react"
import { LazyDiv } from "../lazyDiv"

const DAY_OF_WEEK = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
]

/**
 * 초대장의 메인 커버 섹션입니다.
 * 예식 일시, 신랑/신부 이름, 장소를 표시합니다.
 *
 * @returns {JSX.Element} 커버 섹션
 */
export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      {/* 상단 날짜 표시 */}
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>
      {/* 요일 표시 (영어) */}
      <div className="wedding-day-of-week">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>
      {/* 커버 이미지 */}
      <div className="image-wrapper">
        <img src={COVER_IMAGE} alt="sample" />
      </div>
      <div className="subtitle">
        Trân trọng kính mời đến dự lễ thành hôn của
      </div>
      {/* 이름 표시 */}
      <div className="names">
        {GROOM_FULLNAME}
        <HeartIcon className="heart" />
        {BRIDE_FULLNAME}
      </div>
      {/* 예식 정보 (포맷팅된 날짜 및 장소) */}
      <div className="info time">
        <ClockIcon className="info-icon" /> {WEDDING_TIME_TEXT} –{" "}
        {WEDDING_WEEKDAY_TEXT}
      </div>
      <div className="info">{WEDDING_SOLAR_TEXT}</div>
      <div className="info lunar">({WEDDING_LUNAR_TEXT})</div>
      <div className="info place">
        Tại: <b>{LOCATION}</b>
      </div>
    </LazyDiv>
  )
}
