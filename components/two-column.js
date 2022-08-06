import Styles from 'styles/two-column.module.css'

export function TwoColumn({children}) {
  return (
    <>
        <div className={Styles.flexContainer}>
            {children}
        </div>
    </>
  )
}
export function TwoColumnMain({children}) {
  return (
    <>
        <div className={Styles.main}>
            {children}
        </div>
    </>
  )
}
export function TwoColumnSidebar({children}) {
  return (
    <>
        <div className={Styles.sidebar}>
            {children}
        </div>
    </>
  )
}
