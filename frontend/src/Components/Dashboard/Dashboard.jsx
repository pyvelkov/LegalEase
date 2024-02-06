import { useState } from "react";
import { Box, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const Dashboard = () => {
    // Set initial empty state
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleEditWordFile = async () => {
    //     try {
    //         const response = await fetch(
    //             `${import.meta.env.VITE_SERVER_URL}/wordRoutes/editWordFile`,
    //             {
    //                 method: "POST",
    //                 mode: "cors",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(formData),
    //             }
    //         );

    //         const result = await response.text();
    //         console.log(result);
    //     } catch (error) {
    //         console.error("Error editing Word file:", error);
    //     }
    // };

    return (
        <>
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

                <Button mt={4} colorScheme="blue">
                    Edit Document
                </Button>
            </Box>
        </>
    );
};

export default Dashboard;
