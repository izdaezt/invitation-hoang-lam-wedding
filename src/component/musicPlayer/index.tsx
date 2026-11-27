/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { MUSIC } from "../../const"
import "./index.scss"

const API_URL = "https://www.youtube.com/iframe_api"

/** Tải YouTube IFrame API một lần duy nhất */
let apiPromise: Promise<any> | null = null
const loadYouTubeApi = () => {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    const w = window as any
    if (w.YT && w.YT.Player) return resolve(w.YT)
    const prev = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(w.YT)
    }
    const script = document.createElement("script")
    script.src = API_URL
    document.head.appendChild(script)
  })
  return apiPromise
}

/**
 * Nhạc nền YouTube (cấu hình ở common.music trong src/config/wedding.json).
 *
 * Trình duyệt thường chặn phát có tiếng khi người dùng chưa chạm vào trang, nên:
 * 1. Vừa mở trang: thử phát có tiếng ngay (được phép trên một số trình duyệt,
 *    ví dụ trình duyệt trong Zalo/Facebook, hoặc khi khách từng tương tác với trang).
 * 2. Nếu bị chặn: phát tắt tiếng (luôn được phép), rồi bật tiếng ngay khi
 *    khách chạm / bấm / gõ phím lần đầu.
 * 3. Nút tròn ở góc phải để bật/tắt nhạc bất cứ lúc nào.
 */
export const MusicPlayer = () => {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  // "waiting": đang phát câm, chờ người dùng chạm lần đầu để bật tiếng
  const [status, setStatus] = useState<"waiting" | "on" | "off">("waiting")
  const statusRef = useRef(status)
  statusRef.current = status

  useEffect(() => {
    if (!MUSIC?.enabled || !MUSIC.playlistId) return
    let cancelled = false

    loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return
      const el = document.createElement("div")
      hostRef.current.appendChild(el)

      playerRef.current = new YT.Player(el, {
        width: 200,
        height: 200,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1 },
        events: {
          onReady: (e: any) => {
            const p = e.target
            p.unMute()
            p.setVolume(MUSIC.volume ?? 70)
            p.loadPlaylist({
              listType: "playlist",
              list: MUSIC.playlistId,
              index: MUSIC.startIndex ?? 0,
              startSeconds: MUSIC.startSeconds ?? 0,
            })
            p.setLoop(MUSIC.loop !== false)

            // Nếu sau 1,5 giây vẫn chưa phát được tiếng (bị chặn) thì phát câm
            window.setTimeout(() => {
              if (cancelled) return
              if (p.getPlayerState() === 1 && !p.isMuted()) {
                setStatus("on")
              } else {
                p.mute()
                p.playVideo()
              }
            }, 1500)
          },
        },
      })
    })

    // Lần chạm đầu tiên: bật tiếng. Chỉ coi là thành công nếu thực sự đang phát có tiếng,
    // còn không (ví dụ chỉ là thao tác cuộn trang) thì đợi lần chạm sau.
    const events = [
      "pointerup",
      "touchend",
      "mousedown",
      "keydown",
      "click",
    ] as const
    const removeAll = (): void =>
      events.forEach((ev) => window.removeEventListener(ev, unlock, true))
    const unlock = (): void => {
      const p = playerRef.current
      if (!p || !p.unMute) return // player chưa sẵn sàng, đợi lần chạm sau
      if (statusRef.current !== "waiting") {
        removeAll()
        return
      }
      p.unMute()
      p.setVolume(MUSIC.volume ?? 70)
      p.playVideo()
      window.setTimeout(() => {
        if (cancelled) return
        if (p.getPlayerState() === 1 && !p.isMuted()) {
          setStatus("on")
          removeAll()
        } else {
          p.mute()
          p.playVideo()
        }
      }, 700)
    }
    events.forEach((ev) => window.addEventListener(ev, unlock, true))

    return () => {
      cancelled = true
      removeAll()
      playerRef.current?.destroy?.()
      playerRef.current = null
    }
  }, [])

  if (!MUSIC?.enabled || !MUSIC.playlistId) return null

  const toggle = () => {
    const p = playerRef.current
    if (!p || !p.unMute) return
    if (status === "on") {
      p.pauseVideo()
      setStatus("off")
    } else {
      p.unMute()
      p.setVolume(MUSIC.volume ?? 70)
      p.playVideo()
      setStatus("on")
    }
  }

  return (
    <>
      <div className="music-host" ref={hostRef} aria-hidden="true" />
      <button
        className={"music-button" + (status === "on" ? " playing" : "")}
        aria-label={status === "on" ? "Tắt nhạc" : "Bật nhạc"}
        onClick={(e) => {
          e.stopPropagation()
          toggle()
        }}
      >
        {status === "on" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10v4h4l5 4V6L7 10H3zm13.6 2 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z" />
          </svg>
        )}
      </button>
    </>
  )
}
