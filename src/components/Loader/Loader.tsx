import styles from './Loader.module.css'

interface Props {
  text?: string
}

const Loader = ({ text }: Props) => {
  return (
    <div className={styles.container}>
      {text && <p className={styles.text}>{text}</p>}
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  )
}

export default Loader