import { useState, useEffect } from "react";
import {
    ChakraProvider,
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

const Dashboard = () => {
    // Set initial empty state
    const [formData, setFormData] = useState({});

    const getAllFieldNames = () => {
        try {
            fetch(
                `${import.meta.env.VITE_SERVER_URL}/wordRoutes/templateTags`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((res) => {
                    console.log(res);
                    return res.json();
                })
                .then((data) => {
                    var tagState = {};

                    // Re-structure data from response
                    data.forEach((tag) => {
                        tagState[tag.tagName] = {
                            fieldValue: "",
                            fieldType: tag.tagType,
                        };
                    });

                    setFormData(tagState);
                });
        } catch (error) {
            console.error("Error getting template tags:", error);
        }
    };

    // Get all unique tags from the template to create input fields for them
    useEffect(getAllFieldNames, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditWordFile = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/wordRoutes/editWordFile`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error("Error editing Word file:", error);
        }
    };

    return (
        <ChakraProvider>
            <Box p={4}>
                {
                    // If tags have been retrieved from backend, render the textboxes.
                    formData ? (
                        Object.keys(formData).map((fieldName, index) => (
                            <FormControl key={index}>
                                <FormLabel>{fieldName}</FormLabel>
                                <Input
                                    type={formData[fieldName].fieldType}
                                    name={fieldName}
                                    value={formData[fieldName].fieldValue}
                                    onChange={handleChange}
                                    placeholder={"Enter value for " + fieldName}
                                />
                            </FormControl>
                        ))
                    ) : (
                        // Else, display placeholder
                        // TODO - Implement loading bar/wheel, etc. while we wait for field data.
                        <FormControl>
                            <FormLabel>PlaceHolder</FormLabel>
                            <Input
                                type="text"
                                name="Placeholder"
                                value="Placeholder"
                                onChange={handleChange}
                                placeholder="Enter value for Placeholder"
                            />
                        </FormControl>
                    )
                }

                <Button mt={4} colorScheme="blue" onClick={handleEditWordFile}>
                    Create Document
                </Button>
            </Box>
        </ChakraProvider>
    );
};

export default Dashboard;
