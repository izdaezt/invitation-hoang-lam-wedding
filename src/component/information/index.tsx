import { useState } from "react"
import {
  BRIDE_INFO,
  DONATION_TITLES,
  DONATION_VERSES,
  GROOM_INFO,
  MEAL,
} from "../../const"
import { STATIC_ONLY } from "../../env"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { Modal } from "../modal"
import { copyText } from "../../utils/copy"
import { AttendanceInfo } from "./attendance"

/**
 * 식사 정보 안내 컴포넌트입니다.
 */
export const Information1 = () => {
  return (
    <>
      <h2 className="english">Information</h2>
      <div className="info-card">
        <div className="label">Thông tin tiệc</div>
        <div className="content">
          Giờ tiệc: {MEAL.time}
          <br />
          Địa điểm: {MEAL.place}
        </div>
      </div>
    </>
  )
}

/**
 * 축의금 계좌번호 안내 컴포넌트입니다.
 * 신랑측, 신부측 계좌번호를 모달로 보여줍니다.
 */
export const Information2 = () => {
  const donationModalState = useState(false)
  // Câu thơ ngẫu nhiên, chọn lại mỗi lần mở popup
  const [verse, setVerse] = useState<string[]>(DONATION_VERSES[0])
  const [title, setTitle] = useState<string>(DONATION_TITLES[0])

  const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

  const open = () => {
    setTitle(pick(DONATION_TITLES))
    setVerse(pick(DONATION_VERSES))
    donationModalState[1](true)
  }

  const groups = [
    { title: "Nhà trai", list: GROOM_INFO },
    { title: "Nhà gái", list: BRIDE_INFO },
  ]
    .map((g) => ({ ...g, list: g.list.filter(({ account }) => !!account) }))
    .filter((g) => g.list.length > 0)

  return (
    <>
      <div className="info-card">
        <div className="label">Gửi lời chúc mừng</div>
        <div className="content">
          Dành cho những ai không thể đến dự
          <br />
          và muốn gửi lời chúc mừng từ xa,
          <br />
          chúng tôi xin gửi kèm số tài khoản.
        </div>

        <div className="break" />

        <Button style={{ width: "100%" }} onClick={open}>
          Tài khoản nhà trai
        </Button>
        <div className="break" />
        <Button style={{ width: "100%" }} onClick={open}>
          Tài khoản nhà gái
        </Button>
      </div>

      {/* Popup chung cho cả nhà trai và nhà gái */}
      <Modal
        modalState={donationModalState}
        className="donation-modal"
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title">{title}</div>
        </div>
        <div className="content">
          <div className="verse">
            {verse.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          {groups.map(({ title, list }) => (
            <div className="account-group" key={title}>
              <div className="group-title">{title}</div>
              {list.map(({ relation, name, account }) => (
                <div className="account-info" key={relation}>
                  <div>
                    <div className="name">
                      <span className="relation">{relation}</span> {name}
                    </div>
                    <div>{account}</div>
                  </div>
                  <Button
                    className="copy-button"
                    onClick={async () => {
                      if (await copyText(account)) {
                        alert(account + "\nĐã sao chép.")
                      } else {
                        alert("Sao chép thất bại.")
                      }
                    }}
                  >
                    Sao chép
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => donationModalState[1](false)}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  )
}

/**
 * 정보 안내(식사, 축의금, 참석의사)를 통합하여 표시하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 정보 안내 섹션
 */
export const Information = () => {
  // 정적 모드일 경우 참석 의사 전달 기능을 제외합니다.
  if (STATIC_ONLY) {
    return (
      <>
        <LazyDiv className="card information">
          <Information1 />
        </LazyDiv>
        <LazyDiv className="card information">
          <Information2 />
        </LazyDiv>
      </>
    )
  }

  return (
    <LazyDiv className="card information">
      <Information1 />
      <Information2 />
      <AttendanceInfo />
    </LazyDiv>
  )
}
