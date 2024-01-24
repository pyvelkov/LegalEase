import { useDropzone } from "react-dropzone";
import { Box, Text, Center, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const DropZone = () => {
    const onDrop = async (acceptedFiles) => {
        try {
            //const formData = new FormData();
            //formData.append("templateFile", acceptedFiles[0]);
            //formData.append("templateName", acceptedFiles[0].name);

            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/template/e2677ed7-57a8-40f5-b2ba-285948f7b732`,
                {
                    method: "GET",
                    //body: formData,
                }
            );

            if (response.ok) {
                console.log("Server got the file");
                console.log(response);
            } else {
                console.log(
                    "Something went wrong with file uploading (Server-side)."
                );
            }

            // acceptedFiles.forEach((file) => {
            //     console.log("Uploaded file:", file);
            // });
        } catch (err) {
            console.log("Error uploading file: ", err);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

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
            <Button
                    variant="outline"
                    _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                    onClick={onDrop}
                >
                    Create account
                </Button>
        </Center>
    );
};

export default DropZone;
