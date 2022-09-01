import { Certificate } from "../helpers/saveCertificate";
import styles from "../styles/CertDetailsArea.module.css";
type Props = {
  certificate: Certificate | null;
};
export const CertDetailsArea: React.FC<Props> = ({ certificate }) => {
  if (certificate) {
    return (
      <div className={styles.container}>
        {"Common Name: " + certificate.subject_commonName}
        <br />
        {"Issuer CN: " + certificate.issuer_commonName}
        <br />
        {"Valid From: " + certificate.valid_from.substring(0, 10)}
        <br />
        {"Valid To: " + certificate.valid_to.substring(0, 10)}
      </div>
    );
  } else {
    return (
      <div className={styles.container} style={{ justifyContent: "center" }}>
        Виберіть сертифікат щоб переглянути інформацію
      </div>
    );
  }
};
