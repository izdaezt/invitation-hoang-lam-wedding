import { Fragment } from "react"

/**
 * Hiển thị danh sách dòng chữ (ngắt dòng bằng <br />), hỗ trợ **in đậm**.
 */
export const RichLines = ({ lines }: { lines: string[] }) => (
  <>
    {lines.map((line, i) => (
      <Fragment key={i}>
        {i > 0 && <br />}
        {line.split(/\*\*(.+?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <b key={j}>{part}</b> : part,
        )}
      </Fragment>
    ))}
  </>
)
