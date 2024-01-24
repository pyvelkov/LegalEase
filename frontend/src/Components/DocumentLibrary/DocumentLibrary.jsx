import { useState } from "react";
import { SimpleGrid, Box, Center, Text } from "@chakra-ui/react";
import DocumentCard from "./DocumentCard";

const DocumentLibrary = () => {
    // this is temporary and will be replaced with fetch
    const [documents, setDocuments] = useState([
        {
            uuid: "1",
            name: "doc1",
            uploadDate: "01/21/2024",
        },
        {
            uuid: "2",
            name: "doc2",
            uploadDate: "02/21/2024",
        },
        {
            uuid: "3",
            name: "doc3",
            uploadDate: "03/21/2024",
        },
        {
            uuid: "4",
            name: "doc4",
            uploadDate: "04/21/2024",
        },
    ]);
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
                                <Box key={doc.uuid}>
                                    <DocumentCard
                                        key={doc.uuid}
                                        docName={doc.name}
                                        uploadDate={doc.uploadDate}
                                        uuid={doc.uuid}
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
