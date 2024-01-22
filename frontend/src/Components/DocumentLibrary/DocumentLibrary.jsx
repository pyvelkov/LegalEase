import { useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import DocumentCard from "./DocumentCard";

const DocumentLibrary = () => {
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
        <Box p="3%">
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing="40px">
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
        </Box>
    );
};

export default DocumentLibrary;
