export default function Message({children, type}) {
  return (
    <div className={`alerta ${type}`}>{children}</div>
  )
}
