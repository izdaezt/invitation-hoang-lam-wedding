import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

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

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">Di chuyển</div>
          <div />
          <div className="content">
            * Từ sân bay Đồng Hới
            <br />
            Cách trung tâm thành phố khoảng <b>5 km</b>
            <br />→ Đi taxi hoặc xe công nghệ (Grab, Be) khoảng 10–15 phút
            <br />
            * Từ ga Đồng Hới
            <br />→ Đi taxi / xe công nghệ khoảng 5–10 phút
          </div>
          <div />
          <div className="content">
            * Xe khách / xe buýt
            <br />
            Xuống tại <b>bến xe Đồng Hới</b>
            <br />→ Đi taxi hoặc xe công nghệ đến địa điểm tiệc.
          </div>
        </div>

        {/* Tự lái */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">Xe cá nhân</div>
          <div />
          <div className="content">
            Dùng Google Maps tìm
            <br />
            <b>{LOCATION}</b>
            <br />
            - Có bãi đỗ xe miễn phí cho khách mời.
          </div>
          <div />
          <div className="content">
            <b>※ Vui lòng đến sớm để dễ sắp xếp chỗ đỗ xe.</b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
