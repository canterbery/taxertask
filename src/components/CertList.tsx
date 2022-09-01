import { Certificate } from "../helpers/saveCertificate";
import styles from "../styles/CertList.module.css";
import Arrow from "../assets/black.png";

type Props = {
  certList: Certificate[];
  onClick(cert: Certificate): void;
  currentCert: Certificate | null;
  btnClick(): void;
  showUpload: boolean;
};
export const CertList: React.FC<Props> = ({
  certList,
  onClick,
  currentCert,
  btnClick,
  showUpload,
}) => {
  function compare(a: Certificate | null, b: Certificate | null) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  const btnLabel = showUpload ? "Скасувати" : "Додати";
  const clickable = showUpload ? "none" : "auto";

  return (
    <>
      {certList.map((item) => (
        <div
          key={Math.random()}
          className={styles.item}
          onClick={() => onClick(item)}
          style={{
            backgroundColor: compare(currentCert, item) ? "darkgray" : "white",
            pointerEvents: clickable,
          }}
        >
          {item.subject_commonName}

          <img
            src={Arrow}
            alt=""
            style={{ display: compare(currentCert, item) ? "block" : "none" }}
          />
        </div>
      ))}

      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={() => btnClick()}>
          {btnLabel}
        </button>
      </div>
    </>
  );
};
