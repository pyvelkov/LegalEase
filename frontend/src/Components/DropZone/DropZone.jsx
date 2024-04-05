import { useDropzone } from "react-dropzone";
import { Box, Text, Center } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { uploadTemplate } from "../../util/API/fetchApi";
import { useSelector } from "react-redux";

/**
 * Generates the drop box for uploading files
 *
 * @return {*}
 */
const DropZone = ({ docUploaded }) => {
    const token = useSelector((state) => state.user.token);
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

            const response = await uploadTemplate(uuidv4(), formData, token);
            if (response.ok) {
                console.log("Server got the file");
                // update the key so it forces documentLibrary to re-render
                docUploaded();
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
                mb={10}
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
