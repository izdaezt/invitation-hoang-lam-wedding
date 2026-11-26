import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_TEXT,
} from "../../const"
import { Button } from "../button"
import { Modal } from "../modal"
import { useEffect, useRef, useState } from "react"
import HeartIcon from "../../icons/heart-icon.svg?react"
import CalendarIcon from "../../icons/calendar-icon.svg?react"
import MarkerIcon from "../../icons/marker-icon.svg?react"
import { SERVER_URL } from "../../env"

/**
 * 입력 데이터 제한 규칙
 */
const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

/**
 * 참석 의사를 전달할 수 있는 카드와 폼 모달을 관리하는 컴포넌트입니다.
 *
 * @returns {JSX.Element | null} Xác nhận tham dự 섹션
 */
export const AttendanceInfo = () => {
  const attendanceInfoModalState = useState(false)
  const attendanceFormModalState = useState(false)

  const initialized = useRef(false)
  const now = useRef(dayjs())

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // 서버 URL이 없거나 예식일이 지났으면 안내 모달을 띄우지 않음
    if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return

    attendanceInfoModalState[1](true)
  }, [attendanceInfoModalState])

  // 서버 연동 기능이 비활성화되어 있거나 이미 예식이 종료된 경우 섹션을 렌더링하지 않음
  if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return null

  return (
    <>
      <div className="info-card">
        <div className="label">Xác nhận tham dự</div>
        <div className="content">
          Bạn có thể báo trước cho
          <br />
          cô dâu chú rể việc tham dự.
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            attendanceFormModalState[1](true)
          }}
        >
          Xác nhận tham dự
        </Button>
      </div>

      {/* 참석 안내 모달 */}
      <Modal
        className="attendance-info-modal"
        modalState={attendanceInfoModalState}
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title">Xác nhận tham dự</div>
        </div>
        <div className="content">
          <div className="info-message">
            Để chuẩn bị chu đáo nhất cho
            <br />
            tất cả quý khách đến chung vui,
            <br />
            mong bạn cho biết trước việc tham dự và dùng tiệc.
            <div className="break" />
            Cảm ơn bạn rất nhiều!
          </div>
          <div className="wedding-info">
            <HeartIcon /> Chú rể {GROOM_FULLNAME} & Cô dâu {BRIDE_FULLNAME}
            <br />
            <CalendarIcon /> {WEDDING_DATE_TEXT}
            <br />
            <MarkerIcon /> {LOCATION}
          </div>
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            onClick={() => {
              attendanceInfoModalState[1](false)
              attendanceFormModalState[1](true)
            }}
          >
            Xác nhận tham dự
          </Button>
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => {
              attendanceInfoModalState[1](false)
            }}
          >
            Đóng
          </Button>
        </div>
      </Modal>

      {/* 참석 의사 입력 폼 모달 */}
      <Modal
        className="attendance-form-modal"
        modalState={attendanceFormModalState}
        closeOnClickBackground={true}
      >
        <AttendanceFormModal
          onClose={() => {
            attendanceFormModalState[1](false)
          }}
        />
      </Modal>
    </>
  )
}

/**
 * 참석 의사를 입력받아 서버로 전송하는 폼 컴포넌트입니다.
 */
const AttendanceFormModal = ({ onClose }: { onClose: () => void }) => {
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const side = inputRef.current.side.groom.checked
            ? "groom"
            : inputRef.current.side.bride.checked
              ? "bride"
              : null
          const name = inputRef.current.name.value
          const meal = inputRef.current.meal.yes.checked
            ? "yes"
            : inputRef.current.meal.undecided.checked
              ? "undecided"
              : inputRef.current.meal.no.checked
                ? "no"
                : null
          const count = Number(inputRef.current.count.value)

          // 유효성 검사
          if (!side) {
            alert("Vui lòng chọn nhà trai hoặc nhà gái.")
            return
          }
          if (!name) {
            alert("Vui lòng nhập họ tên.")
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(`Họ tên tối đa ${RULES.name.maxLength} ký tự.`)
            return
          }
          if (!meal) {
            alert("Vui lòng chọn việc dùng tiệc.")
            return
          }
          if (isNaN(count)) {
            alert("Vui lòng nhập số người tham dự.")
            return
          }
          if (count < RULES.count.min) {
            alert(`Số người tham dự tối thiểu là ${RULES.count.min}.`)
            return
          }

          // 서버에 데이터 전송
          const res = await fetch(`${SERVER_URL}/attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ side, name, meal, count }),
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert("Đã gửi xác nhận tham dự thành công.")
          onClose()
        } catch {
          alert("Gửi xác nhận tham dự thất bại.")
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="header">
        <div className="title">Xác nhận tham dự</div>
      </div>
      <div className="content">
        <div className="input-group">
          <div className="label">Bạn là khách của</div>
          <div className="select-input">
            <label>
              <input
                disabled={loading}
                type="radio"
                name="side"
                value="groom"
                hidden
                defaultChecked
                ref={(ref) => {
                  inputRef.current.side.groom = ref as HTMLInputElement
                }}
              />
              <span>Chú rể</span>
            </label>

            <label>
              <input
                disabled={loading}
                type="radio"
                name="side"
                value="bride"
                hidden
                ref={(ref) => {
                  inputRef.current.side.bride = ref as HTMLInputElement
                }}
              />
              <span>Cô dâu</span>
            </label>
          </div>
        </div>

        <div className="input-group">
          <div className="label">Họ tên</div>
          <div className="input">
            <input
              disabled={loading}
              type="text"
              placeholder="Nhập họ tên người tham dự"
              maxLength={RULES.name.maxLength}
              ref={(ref) => {
                inputRef.current.name = ref as HTMLInputElement
              }}
            />
          </div>
        </div>

        <div className="input-group">
          <div className="label">Dùng tiệc</div>
          <div className="radio-input">
            <label>
              <input
                disabled={loading}
                type="radio"
                name="meal"
                value="yes"
                ref={(ref) => {
                  inputRef.current.meal.yes = ref as HTMLInputElement
                }}
              />
              <span>Có</span>
            </label>

            <label>
              <input
                disabled={loading}
                type="radio"
                name="meal"
                value="undecided"
                ref={(ref) => {
                  inputRef.current.meal.undecided = ref as HTMLInputElement
                }}
              />
              <span>Chưa chắc</span>
            </label>

            <label>
              <input
                disabled={loading}
                type="radio"
                name="meal"
                value="no"
                ref={(ref) => {
                  inputRef.current.meal.no = ref as HTMLInputElement
                }}
              />
              <span>Không</span>
            </label>
          </div>
        </div>

        <div className="input-group">
          <div className="label">Số người (gồm cả bạn)</div>
          <div>
            <input
              disabled={loading}
              type="number"
              min={RULES.count.min}
              defaultValue={RULES.count.default}
              ref={(ref) => {
                inputRef.current.count = ref as HTMLInputElement
              }}
            />
            người
          </div>
        </div>
      </div>
      <div className="footer">
        <Button buttonStyle="style2" disabled={loading} type="submit">
          Gửi
        </Button>
        <Button
          buttonStyle="style2"
          type="button"
          className="bg-light-grey-color text-dark-color"
          onClick={onClose}
        >
          Đóng
        </Button>
      </div>
    </form>
  )
}
