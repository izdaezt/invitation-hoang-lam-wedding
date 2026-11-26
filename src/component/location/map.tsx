import { useRef, useState } from "react"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import { LOCATION, LOCATION_ADDRESS, WEDDING_HALL_POSITION } from "../../const"

const [LNG, LAT] = WEDDING_HALL_POSITION

// Google Maps embed (không cần API key)
const EMBED_URL = `https://maps.google.com/maps?q=${LAT},${LNG}&z=15&hl=vi&output=embed`
const VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`

/**
 * Bản đồ Google Maps và các nút mở bản đồ / chỉ đường.
 */
export const Map = () => {
  // Khóa tương tác để tránh vô tình kéo bản đồ khi cuộn trang trên điện thoại
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  const showMessage = () => {
    setShowLockMessage(true)
    if (lockMessageTimeout.current !== null) {
      clearTimeout(lockMessageTimeout.current)
    }
    lockMessageTimeout.current = window.setTimeout(
      () => setShowLockMessage(false),
      3000,
    )
  }

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div className="lock" onTouchStart={showMessage} onMouseDown={showMessage}>
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> Nhấn nút ổ khóa để mở khóa
                <br />
                rồi phóng to và di chuyển bản đồ.
              </div>
            )}
          </div>
        )}

        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null) {
              clearTimeout(lockMessageTimeout.current)
            }
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        <iframe
          className="map-inner"
          title={`${LOCATION} - ${LOCATION_ADDRESS}`}
          src={EMBED_URL}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="navigation">
        <button onClick={() => window.open(VIEW_URL, "_blank")}>
          Mở Google Maps
        </button>
        <button onClick={() => window.open(DIRECTIONS_URL, "_blank")}>
          Chỉ đường
        </button>
      </div>
    </>
  )
}
