import DocumentLibrary from "../../Components/DocumentLibrary/DocumentLibrary";
import DropZone from "../../Components/DropZone/DropZone";
import { Box, Divider, AbsoluteCenter } from "@chakra-ui/react";

/**
 * Generates a combined divider component with the DropZone component
 */
const FileUpload = () => {
    return (
        <>
            <DocumentLibrary />
            <Box position="relative" padding="50px">
                <Divider />
                <AbsoluteCenter bg="light" px="40">
                    New Document
                </AbsoluteCenter>
            </Box>
            <DropZone />
        </>
    );
};

export default FileUpload;
