import { useState } from "react";
import {
    ChakraProvider,
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

const Dashboard = () => {
    const [formData, setFormData] = useState({
        date: "",
        corporationName: "",
        corporationAddress: "",
        corporationRepresentativeName: "",
        representativeTitle: "",
        targetCorporationName: "",
    });

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
                <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Enter date"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Corporation Name</FormLabel>
                    <Input
                        type="text"
                        name="corporationName"
                        value={formData.corporationName}
                        onChange={handleChange}
                        placeholder="Enter Corporation Name"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Corporation Address</FormLabel>
                    <Input
                        type="text"
                        name="corporationAddress"
                        value={formData.corporationAddress}
                        onChange={handleChange}
                        placeholder="Enter Corporation Address"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Corporation Representative Name</FormLabel>
                    <Input
                        type="text"
                        name="corporationRepresentativeName"
                        value={formData.corporationRepresentativeName}
                        onChange={handleChange}
                        placeholder="Enter Corporation Representative Name"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Representative Title</FormLabel>
                    <Input
                        type="text"
                        name="representativeTitle"
                        value={formData.representativeTitle}
                        onChange={handleChange}
                        placeholder="Enter Representative Title"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Target Corporation Name</FormLabel>
                    <Input
                        type="text"
                        name="targetCorporationName"
                        value={formData.targetCorporationName}
                        onChange={handleChange}
                        placeholder="Enter Target Corporation Name"
                    />
                </FormControl>

                <Button mt={4} colorScheme="blue" onClick={handleEditWordFile}>
                    Create Document
                </Button>
            </Box>
        </ChakraProvider>
    );
};

export default Dashboard;
