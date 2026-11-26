import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { Modal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"
import { useState } from "react"

/**
 * 초대 메시지와 혼주 정보, Liên hệ 기능을 제공하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 모시는 글 섹션
 */
export const Invitation = () => {
  const contactModalState = useState(false)
  return (
    <>
      <LazyDiv className="card invitation">
        <h2 className="english">Invitation</h2>

        <div className="break" />

        {/* 초대 문구 */}
        <div className="content">Giữa ngày hè rực rỡ hương sắc</div>
        <div className="content">Chúng tôi trân trọng kính mời</div>
        <div className="content">quý khách đến chung vui trong ngày trọng đại.</div>
        <div className="break" />
        <div className="content">Khi nắng gắt, sẽ che chở cho nhau;</div>
        <div className="content">khi mưa về, sẽ là chiếc ô của nhau,</div>
        <div className="content">cùng nhau nên vợ nên chồng.</div>
        <div className="break" />
        <div className="content">Rất mong quý khách đến dự</div>
        <div className="content">và chúc phúc cho chúng tôi.</div>

        <div className="break" />

        {/* 혼주 및 신랑 정보 */}
        <div className="name">
          Ông {GROOM_FATHER} · Bà {GROOM_MOTHER}
          <span className="relation">
            {" "}
            – <span className="relation-name">{GROOM_TITLE}</span>
          </span>{" "}
          {GROOM_FULLNAME}
        </div>
        {/* 혼주 및 신부 정보 */}
        <div className="name">
          Ông {BRIDE_FATHER} · Bà {BRIDE_MOTHER}
          <span className="relation">
            {" "}
            – <span className="relation-name">{BRIDE_TITLE}</span>
          </span>{" "}
          {BRIDE_FULLNAME}
        </div>

        <div className="break" />

        <Button
          onClick={() => {
            contactModalState[1](true)
          }}
        >
          Liên hệ
        </Button>
      </LazyDiv>

      {/* 연락처 정보 모달 */}
      <Modal
        modalState={contactModalState}
        className="contact-modal"
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title-group">
            <div className="title">Gửi lời chúc mừng</div>
            <div className="subtitle">
              Gọi điện hoặc nhắn tin để gửi lời chúc.
            </div>
          </div>
        </div>

        <div className="content">
          {/* 신랑측 연락처 */}
          <div className="contact-info">
            {GROOM_INFO.filter(({ phone }) => !!phone).map(
              ({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div>{name}</div>
                  <div>
                    {/* 전화 걸기 */}
                    <PhoneIcon
                      className="flip icon"
                      onClick={() => {
                        window.open(`tel:${phone}`, "_self")
                      }}
                    />
                    {/* 문자 보내기 */}
                    <EnvelopeIcon
                      className="icon"
                      onClick={() => {
                        window.open(`sms:${phone}`, "_self")
                      }}
                    />
                  </div>
                </Fragment>
              ),
            )}
          </div>
          {/* 신부측 연락처 */}
          <div className="contact-info">
            {BRIDE_INFO.filter(({ phone }) => !!phone).map(
              ({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div>{name}</div>
                  <div>
                    <PhoneIcon
                      className="flip icon"
                      onClick={() => {
                        window.open(`tel:${phone}`, "_self")
                      }}
                    />
                    <EnvelopeIcon
                      className="icon"
                      onClick={() => {
                        window.open(`sms:${phone}`, "_self")
                      }}
                    />
                  </div>
                </Fragment>
              ),
            )}
          </div>
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => contactModalState[1](false)}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  )
}
