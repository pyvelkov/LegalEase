import { useDropzone } from "react-dropzone";
import { Box, Text, Center } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { uploadTemplate } from "../../util/API/fetchApi";

/**
 * Generates the drop box for uploading files
 *
 * @return {*}
 */
const DropZone = () => {
    /**
     * onDrop handles the uploading of document files to the server
     *
     * @param {File} acceptedFiles {the uploaded file with all of its information}
     */
    const onDrop = async (acceptedFiles) => {
        try {
            const formData = new FormData();
            formData.append("templateFile", acceptedFiles[0]);
            formData.append("templateName", acceptedFiles[0].name);

            const response = await uploadTemplate(uuidv4(), formData);
            if (response.ok) {
                console.log("Server got the file");
            } else {
                console.log(
                    "Something went wrong with file uploading (Server-side)."
                );
            }
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
                width="500px"
                height="100px"
            >
                <input {...getInputProps()} />
                <Box>
                    {isDragActive ? (
                        <Center>
                            <Text>{`Drop the document here!`}</Text>
                        </Center>
                    ) : (
                        <>
                            <Center>
                                <Text>
                                    {`Drag and drop document here or click to select it!`}
                                </Text>
                            </Center>
                            <Center>
                                <Text>{`(docx, pdf, image)`}</Text>
                            </Center>
                        </>
                    )}
                </Box>
            </Box>
        </Center>
    );
};

export default DropZone;
