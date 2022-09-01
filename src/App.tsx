import React, { useState } from "react";
import "./App.css";
import { CertDetailsArea } from "./components/CertDetailsArea";
import { CertList } from "./components/CertList";
import { UploadArea } from "./components/UploadArea";
import { Certificate, saveCertificate } from "./helpers/saveCertificate";
import ASN1 from "@lapo/asn1js";
import { parseNode } from "./parseNode";

function App() {
  const [cert, setCert] = useState<Certificate | null>(null);
  const [showUpload, setMode] = useState<boolean>(false);
  const [file, setFile] = useState<null | File>(null);

  const certificates: Certificate[] = JSON.parse(
    localStorage.getItem("certList") || "[]"
  );
  function setCurrentCert(cert: Certificate) {
    setCert(cert);
  }
  function setDisplayMode() {
    setMode(!showUpload);
    setCert(null);
  }

  const handleChange = async (file: File) => {
    let buffer = await file.arrayBuffer();
    let typedBuffer = new Uint8Array(buffer);
    const result = ASN1.decode(typedBuffer);
    if (result.typeName() !== "SEQUENCE") {
      throw "Неправильна структура конверта сертифіката (очікується SEQUENCE)";
    }
    const tbsCertificate = result.sub[0];
    const parsedCertificate = parseNode(tbsCertificate, {});
    const { subject_commonName, issuer_commonName, valid_from, valid_to } =
      parsedCertificate;
    const forSaveCertificate = {
      subject_commonName,
      issuer_commonName,
      valid_from,
      valid_to,
    };
    saveCertificate(forSaveCertificate);
    setFile(file);
  };
  return (
    <div className="appWrapper">
      <div className="contentWrapper">
        <div className="certList">
          <CertList
            certList={certificates}
            onClick={setCurrentCert}
            currentCert={cert}
            btnClick={setDisplayMode}
            showUpload={showUpload}
          />
        </div>
        <div className="certDetails">
          {!showUpload && <CertDetailsArea certificate={cert} />}
          {showUpload && <UploadArea handleChange={handleChange} />}
        </div>
      </div>
    </div>
  );
}

export default App;
