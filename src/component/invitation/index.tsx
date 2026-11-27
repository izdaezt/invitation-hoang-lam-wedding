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
  INVITATION,
} from "../../const"
import { LOGO_IMAGE } from "../../images"
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
        <img className="logo" src={LOGO_IMAGE} alt="Hoàng & Lam" />
        <h2 className="english">Invitation</h2>

        <div className="break" />

        {/* Lời mời (lấy từ src/config/wedding.json) */}
        {INVITATION.map((group, i) => (
          <Fragment key={i}>
            {group.map((line, j) => (
              <div className="content" key={j}>
                {line}
              </div>
            ))}
            <div className="break" />
          </Fragment>
        ))}

        {(["groom", "bride"] as const).map((side) => {
          const p =
            side === "groom"
              ? {
                  father: GROOM_FATHER,
                  mother: GROOM_MOTHER,
                  title: GROOM_TITLE,
                  name: GROOM_FULLNAME,
                }
              : {
                  father: BRIDE_FATHER,
                  mother: BRIDE_MOTHER,
                  title: BRIDE_TITLE,
                  name: BRIDE_FULLNAME,
                }
          return (
            <div className="family" key={side}>
              <div className="line">
                <span className="role">Ông</span> <b>{p.father}</b>
              </div>
              <div className="line">
                <span className="role">Bà</span> <b>{p.mother}</b>
              </div>
              <div className="line">
                <span className="role">{p.title}</span> <b>{p.name}</b>
              </div>
            </div>
          )
        })}

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
