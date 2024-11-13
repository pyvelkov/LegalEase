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

    /*
     * recursively call function to highlight the matching text that is passed as prop.
     */
    const highlightMatchingText = (textToMatch) => {
        const livePreviewElement =
            document.getElementById("livePreviewElement");
        if (!livePreviewElement) return;

        /*
         * Recursive function to highlight matching text
         */
        const highlightText = (node) => {
            // check if node is text type (most inner node)
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue;
                const regex = new RegExp(textToMatch, "gi");

                // check if there is a match between the text of node and text passed (templated text)
                if (regex.test(text)) {
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    // replace matching text with the highlighted text
                    text.replace(regex, (match, index) => {
                        fragment.appendChild(
                            document.createTextNode(
                                text.slice(lastIndex, index)
                            )
                        );

                        const span = document.createElement("span");
                        span.style.backgroundColor = "yellow";
                        span.textContent = match;

                        fragment.appendChild(span);
                        lastIndex = index + match.length;
                    });

                    fragment.appendChild(
                        document.createTextNode(text.slice(lastIndex))
                    );
                    node.parentNode.replaceChild(fragment, node);
                }
            } else {
                // if node has children keep going deeper till text node is found
                node.childNodes.forEach(highlightText);
            }
        };

        // highlight each child node for the live preview element (div)
        livePreviewElement.childNodes.forEach(highlightText);
    };

    /*
     * remove all highlighted text (span tags) when the field loses focus (click outside or on new input field)
     */
    function removeHighlightText() {
        const livePreviewElement =
            document.getElementById("livePreviewElement");
        if (!livePreviewElement) return;

        // Remove all spans and restore the original text content
        const spans = livePreviewElement.querySelectorAll(
            `span[style*="background-color: yellow"]`
        );
        spans.forEach((span) => {
            span.replaceWith(span.textContent);
        });
    }

    /*
     * checks if formData has the keyName from field.fieldDependencies, if it does spits back the dependency value (if available)
     * if it does not it may still be dependant on a value as long as it is not empty string.
     * take in the specific field (from doc) and the jsx component to return.
     */
    const conditionalChecks = (field, component) => {
        let dependencyVal;
        const keyName = Object.keys(formData).find((key) => {
            const [depKey, depValue] = field.fieldDependencies
                .split(":")
                .map((val) => val.trim());
            if (depValue) {
                dependencyVal = depValue;
            }
            return key.includes(depKey);
        });

        if (keyName) {
            if (dependencyVal) {
                if (dependencyVal == formData[keyName]) {
                    return <>{component}</>;
                }
            } else {
                if (formData[keyName] != "") {
                    return <>{component}</>;
                }
            }
        } else {
            return <></>;
        }
    };

    const renderFields = () => {
        if (!doc) {
            return null;
        }
        return doc.tmpf_fields.map((field) => {
            if (field.fieldType === "text") {
                if (field.fieldDependencies == "") {
                    return (
                        <TextField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                } else if (field.fieldDependencies != "") {
                    return conditionalChecks(
                        field,
                        <TextField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                }
            } else if (field.fieldType === "date") {
                if (field.fieldDependencies == "") {
                    return (
                        <DateField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                } else if (field.fieldDependencies != "") {
                    return conditionalChecks(
                        field,
                        <DateField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                }
            } else if (field.fieldType === "num") {
                if (field.fieldDependencies == "") {
                    return (
                        <NumField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                } else if (field.fieldDependencies != "") {
                    return conditionalChecks(
                        field,
                        <NumField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                }
            } else if (field.fieldType === "dropdown") {
                if (field.fieldDependencies == "") {
                    return (
                        <DropDownField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            options={field.fieldOptions}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                } else if (field.fieldDependencies != "") {
                    return conditionalChecks(
                        field,
                        <DropDownField
                            key={field.fieldName}
                            name={field.fieldName}
                            value={formData[field.fieldName]}
                            options={field.fieldOptions}
                            onChange={handleFieldChange}
                            reviewMode={reviewFields}
                            defaults={formData[field.fieldName]}
                            rawTag={field.fieldTag}
                            highlightAllMatchingText={highlightMatchingText}
                            removeHighlightText={removeHighlightText}
                        />
                    );
                }
            } else {
                return null;
            }
        });
    };

    useEffect(() => {
        // console.log(formData);
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
                        fieldDependencies: field.fieldDependencies,
                    });
                });

                console.log(prepareData);
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
                                        <SimpleGrid
                                            columns={4}
                                            // spacing={6}
                                            spacingX={2}
                                            maxHeight={"70vh"}
                                            overflow={"auto"}
                                            minHeight={"63vh"}
                                        >
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
