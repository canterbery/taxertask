import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CER"];
type Props = {
  handleChange(file: File): void;
};

export const UploadArea: React.FC<Props> = ({ handleChange }) => {
  return (
    <FileUploader
      handleChange={(file: File) => handleChange(file)}
      name="file"
      types={fileTypes}
      hoverTitle=" "
      children={
        <div className="certUploadArea">
          <p>Перетягніть файл сертифікату у поле</p>
        </div>
      }
    />
  );
};
