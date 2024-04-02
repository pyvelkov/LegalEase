import { useState, useEffect } from "react";
import { SimpleGrid, Box, Center, Text } from "@chakra-ui/react";
import DocumentCard from "./DocumentCard";
import { getUploadedDocuments } from "../../util/API/fetchApi";
import { useSelector } from "react-redux";

/**
 * Generates a library of uploaded documents
 */
const DocumentLibrary = () => {
    const token = useSelector((state) => state.user.token);
    const [documents, setDocuments] = useState([{}]);

    /**
     * Fetching document data when UUID changes or mounts
     */
    const fetchDocument = async () => {
        try {
            const response = await getUploadedDocuments(token);
            console.log(response.templates);
            setDocuments(response.templates);
        } catch (error) {
            setDocuments([]);
            console.error("Error fetching document:", error);
        }
    };
    useEffect(() => {
        console.log("fetching init");
        fetchDocument();
    }, []);

    const handleDelete = (deletedDocumentUUID) => {
        // Filter out the deleted document to cause a re-render
        const filteredDocuments = documents.filter(
            (doc) => doc.tmp_uuid !== deletedDocumentUUID
        );
        setDocuments(filteredDocuments);
    };

    return (
        <Center>
            <Box m="10px">
                <Box
                    // p="80px"
                    p={{ sm: "20px", md: "40px", lg: "60px" }}
                    border="outset"
                    borderWidth="2px"
                    borderColor="lightgray"
                    borderRadius={14}
                >
                    {documents && documents.length > 0 ? (
                        <SimpleGrid
                            key="simpleGrid"
                            columns={{ sm: 2, md: 3, lg: 4 }}
                            spacing={{
                                sm: "10px",
                                md: "20px",
                                lg: "40px",
                            }}
                        >
                            {documents.map((doc) => (
                                <Box key={`${doc.tmp_uuid}1`} pt={1}>
                                    <DocumentCard
                                        key={doc.tmp_uuid}
                                        docName={doc.tmp_name}
                                        uploadDate={doc.tmp_date_created}
                                        uuid={doc.tmp_uuid}
                                        onDeleteDocument={handleDelete}
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Text>No Uploaded Documents...</Text>
                    )}
                </Box>
            </Box>
        </Center>
    );
};

export default DocumentLibrary;
