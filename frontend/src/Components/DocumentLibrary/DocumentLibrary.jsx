import { useState } from "react";
import { SimpleGrid, Box, Center, Text } from "@chakra-ui/react";
import DocumentCard from "./DocumentCard";
import { getUploadedDocuments } from "../../util/API/fetchApi";

/**
 * Generates a library of uploaded documents
 */
const DocumentLibrary = () => {
    const [documents, setDocuments] = useState(async () => {
        const response = await getUploadedDocuments();
        setDocuments(response.templates);
    });

    return (
        <Center>
            <Box m="10px">
                <Box
                    p="80px"
                    border="outset"
                    borderWidth="2px"
                    borderColor="lightgray"
                    borderRadius={14}
                >
                    {documents.length > 0 ? (
                        <SimpleGrid
                            columns={{ sm: 2, md: 3, lg: 4 }}
                            spacing="40px"
                        >
                            {documents.map((doc) => (
                                <Box key={doc.tmp_uuid}>
                                    <DocumentCard
                                        key={doc.tmp_uuid}
                                        docName={doc.tmp_name}
                                        uploadDate={doc.tmp_date_created}
                                        uuid={doc.tmp_uuid}
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
