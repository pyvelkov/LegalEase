import { Box, SimpleGrid, GridItem, Stack } from "@chakra-ui/react";
import RichTextEditor from "../../RichTextEditor/RichTextEditor";
const LivePreview = () => {
    return (
        <>
            <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={5}>
                <Box>
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
                                    <SimpleGrid
                                        columns={1}
                                        spacing={1}
                                        maxHeight={"70vh"}
                                        overflow={"auto"}
                                        minHeight={"70vh"}
                                    >
                                        {/* RTE goes here */}
                                        <RichTextEditor />
                                    </SimpleGrid>
                                </Stack>
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
};

export default LivePreview;
