export type Certificate = {
  subject_commonName: string;
  issuer_commonName: string;
  valid_from: string;
  valid_to: string;
};

export const saveCertificate = (cert: Certificate) => {
  const list: Certificate[] = JSON.parse(
    localStorage.getItem("certList") || "[]"
  );
  list.push(cert);
  localStorage.setItem("certList", JSON.stringify(list));
};
