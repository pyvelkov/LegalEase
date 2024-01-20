import { useDropzone } from "react-dropzone";
import { Box, Text, Center } from "@chakra-ui/react";

const DropZone = () => {
    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log("Uploaded file:", file.name);
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    // const textLabel = `Drag and drop document here or click to select it!`;

    return (
        <Center>
            <Box
                {...getRootProps()}
                p={6}
                borderWidth={2}
                borderRadius="lg"
                borderStyle="dashed"
                borderColor={isDragActive ? "teal.500" : "gray.300"}
                cursor="pointer"
            >
                <input {...getInputProps()} />
                <Text>
                    {isDragActive
                        ? "Drop the document here!"
                        : `Drag and drop document here or click to select it! (docx, pdf, image)`}
                </Text>
            </Box>
        </Center>
    );
};

export default DropZone;
