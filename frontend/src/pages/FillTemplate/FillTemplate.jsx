import DocumentLibrary from "../../Components/DocumentLibrary/DocumentLibrary";
import FileUpload from "./FileUpload";

/**
 * Generates the file upload component or DropZone to upload files
 */
const FillTemplate = () => {
    return (
        <>
            <DocumentLibrary />
            <FileUpload />
        </>
    );
};

export default FillTemplate;
