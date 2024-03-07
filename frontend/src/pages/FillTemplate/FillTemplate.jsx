import { useState } from "react";
import DocumentLibrary from "../../Components/DocumentLibrary/DocumentLibrary";
import FileUpload from "./FileUpload";

/**
 * Generates the file upload component or DropZone to upload files
 */
const FillTemplate = () => {
    // update the key so it forces documentLibrary to re-render
    const [uploadCount, setUploadCount] = useState(0);
    const handleUploadSuccess = () => {
        setUploadCount(uploadCount + 1);
    };
    return (
        <>
            <DocumentLibrary key={uploadCount} />
            <FileUpload docUploaded={handleUploadSuccess} />
        </>
    );
};

export default FillTemplate;
