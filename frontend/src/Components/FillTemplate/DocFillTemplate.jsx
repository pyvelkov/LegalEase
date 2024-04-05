import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    fillDownloadTemplate,
    getSpecificTemplate,
} from "../../util/API/fetchApi";
import { useSelector } from "react-redux";
import {
    Box,
    Button,
    Stack,
    SimpleGrid,
    GridItem,
    Text,
    Input,
    Center,
    Divider,
} from "@chakra-ui/react";
import TextField from "./FieldTypes/TextField";
import DateField from "./FieldTypes/DateField";
import NumField from "./FieldTypes/NumField";
import DropDownField from "./FieldTypes/DropDownField";

const DocFillTemplate = () => {
    const token = useSelector((state) => state.user.token);
    const { UUID } = useParams();
    const [doc, setDocument] = useState(null);
    const [formData, setFormData] = useState({});
    const [reviewFields, setReviewFields] = useState(false);
    const [documentName, setDocumentName] = useState("");

    /**
     * Fetching document data when UUID changes or mounts
     */
    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await getSpecificTemplate(UUID, token);
                setDocument(response);
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };
        fetchDocument();
    }, [UUID]);

    /**
     * set the formData keys to the fieldName of each field and assign it as empty when "document" fetched
     */
    useEffect(() => {
        if (doc) {
            const fields = {};
            for (let i = 0; i < doc.tmpf_fields.length; i++) {
                fields[doc.tmpf_fields[i].fieldName] = "";
            }
            setFormData(fields);
        }
    }, [doc]);

    /**
     * handle the field changes
     */
    const handleFieldChange = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleShowBack = () => {
        setReviewFields(false);
    };

    const renderFields = () => {
        if (!doc) {
            return null;
        }
        console.log(doc);
        return doc.tmpf_fields.map((field) => {
            if (field.fieldType === "text") {
                return (
                    <TextField
                        key={field.fieldName}
                        name={field.fieldName}
                        value={formData[field.fieldName]}
                        onChange={handleFieldChange}
                        reviewMode={reviewFields}
                        defaults={formData[field.fieldName]}
                    />
                );
            } else if (field.fieldType === "date") {
                return (
                    <DateField
                        key={field.fieldName}
                        name={field.fieldName}
                        value={formData[field.fieldName]}
                        onChange={handleFieldChange}
                        reviewMode={reviewFields}
                        defaults={formData[field.fieldName]}
                    />
                );
            } else if (field.fieldType === "num") {
                return (
                    <NumField
                        key={field.fieldName}
                        name={field.fieldName}
                        value={formData[field.fieldName]}
                        onChange={handleFieldChange}
                        reviewMode={reviewFields}
                        defaults={formData[field.fieldName]}
                    />
                );
            } else if (field.fieldType === "dropdown") {
                return (
                    <DropDownField
                        key={field.fieldName}
                        name={field.fieldName}
                        value={formData[field.fieldName]}
                        options={field.fieldOptions}
                        onChange={handleFieldChange}
                        reviewMode={reviewFields}
                        defaults={formData[field.fieldName]}
                    />
                );
            } else {
                return null;
            }
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reviewFields) {
            setReviewFields(true);
        } else {
            if (documentName != "") {
                let prepareData = [];
                doc.tmpf_fields.forEach((field) => {
                    prepareData.push({
                        fieldName: field.fieldName,
                        fieldType: field.fieldType,
                        fieldValue: formData[field.fieldName],
                        fieldOptions: field.fieldOptions,
                    });
                });

                const dataToSend = new FormData();
                dataToSend.append("fileName", `${documentName}.docx`);
                dataToSend.append("fields", JSON.stringify(prepareData));

                try {
                    const response = await fillDownloadTemplate(
                        UUID,
                        dataToSend,
                        token
                    );
                    const blob = new Blob([await response.blob()]);

                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    // might need to get the file type later down the line from the "templates" table
                    link.setAttribute("download", `${documentName}.docx`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert("Please enter document name");
            }
        }
    };

    return (
        <>
            <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={5}>
                <Box mt={[2, 0]}>
                    <SimpleGrid
                        display={{ base: "initial", md: "grid" }}
                        columns={{ md: 1 }}
                    >
                        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                            <Box shadow="base" rounded={[null, "md"]}>
                                <Stack
                                    px={4}
                                    py={5}
                                    p={[null, 6]}
                                    bg="white"
                                    _dark={{ bg: "gray.700" }}
                                    spacing={6}
                                >
                                    {document == null || document == {} ? (
                                        <Text>
                                            Fields not set properly in template
                                            or document is invalid...
                                        </Text>
                                    ) : (
                                        <SimpleGrid columns={6} spacing={6}>
                                            {renderFields()}
                                        </SimpleGrid>
                                    )}
                                    {reviewFields && (
                                        <>
                                            <Input
                                                defaultValue={documentName}
                                                type="text"
                                                name="docName"
                                                id="docName"
                                                placeholder="Enter Document name"
                                                mt={1}
                                                value={documentName}
                                                onChange={(e) => {
                                                    setDocumentName(
                                                        e.target.value
                                                    );
                                                }}
                                                focusBorderColor="brand.400"
                                                shadow="sm"
                                                size="sm"
                                                w="full"
                                                rounded="md"
                                            />
                                        </>
                                    )}
                                </Stack>
                                <Box
                                    px={{ base: 4, sm: 6 }}
                                    py={3}
                                    bg="gray.50"
                                    _dark={{ bg: "gray.800" }}
                                    textAlign="center"
                                >
                                    <Center>
                                        <SimpleGrid columns={3} spacing={0}>
                                            {reviewFields && (
                                                <>
                                                    <GridItem colSpan={1}>
                                                        <Button
                                                            onClick={
                                                                handleShowBack
                                                            }
                                                            colorScheme="brand"
                                                            _focus={{
                                                                shadow: "",
                                                            }}
                                                            fontWeight="md"
                                                        >
                                                            Back
                                                        </Button>
                                                    </GridItem>
                                                    <GridItem colSpan={1}>
                                                        <Center height="50px">
                                                            <Divider orientation="vertical" />
                                                        </Center>
                                                    </GridItem>
                                                </>
                                            )}
                                            <GridItem
                                                colSpan={reviewFields ? 1 : 3}
                                            >
                                                <Button
                                                    onClick={handleSubmit}
                                                    colorScheme="brand"
                                                    _focus={{ shadow: "" }}
                                                    fontWeight="md"
                                                >
                                                    {!reviewFields
                                                        ? "Review"
                                                        : "Download"}
                                                </Button>
                                            </GridItem>
                                        </SimpleGrid>
                                    </Center>
                                </Box>
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default DocFillTemplate;
