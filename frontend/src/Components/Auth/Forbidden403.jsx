import {
    Box,
    Flex,
    VStack,
    Text,
    Heading,
    Image,
    Center,
    Spinner,
} from "@chakra-ui/react";

const Forbidden403 = () => {
    return (
        <>
            <Center>
                <Flex px={4} py={3} mx="auto">
                    <VStack>
                        <Box
                            mx="auto"
                            w={{
                                lg: 8 / 12,
                                xl: 5 / 12,
                            }}
                        >
                            <Center>
                                <Spinner size="xl" />
                            </Center>
                        </Box>
                        <Box
                            mx="auto"
                            w={{
                                lg: 8 / 12,
                                xl: 5 / 12,
                            }}
                        >
                            <Center>
                                <Text
                                    as="p"
                                    mb={2}
                                    fontSize="xs"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    color="gray.400"
                                    textTransform="uppercase"
                                >
                                    OOPS...
                                </Text>
                            </Center>
                            <Center>
                                <Heading
                                    as="h1"
                                    mb={3}
                                    fontSize={{
                                        base: "3xl",
                                        md: "4xl",
                                    }}
                                    fontWeight="bold"
                                    lineHeight="shorter"
                                    color="gray.900"
                                    _dark={{
                                        color: "white",
                                    }}
                                >
                                    403 Access Denied
                                </Heading>
                            </Center>
                            <Center>
                                <Text
                                    as="p"
                                    mb={5}
                                    color="gray.500"
                                    fontSize={{
                                        md: "lg",
                                    }}
                                >
                                    You must be logged in to use this.
                                </Text>
                            </Center>
                            <Center>
                                <Text
                                    as="p"
                                    mb={5}
                                    color="gray.500"
                                    fontSize={{
                                        md: "lg",
                                    }}
                                >
                                    Redirecting you to login...
                                </Text>
                            </Center>
                        </Box>
                        <Image
                            w="50%"
                            h="full"
                            py={4}
                            src="/accessDenied.png"
                            alt="accessDenied"
                        />
                    </VStack>
                </Flex>
            </Center>
        </>
    );
};

export default Forbidden403;
