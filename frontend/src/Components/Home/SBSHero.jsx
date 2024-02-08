import {
    Box,
    Button,
    Heading,
    SimpleGrid,
    Text,
    Image,
} from "@chakra-ui/react";

const SBSHero = () => {
    return (
        <Box
            shadow="xl"
            bg="gray.200"
            _dark={{ bg: "gray.800" }}
            px={8}
            py={5}
            my={4}
            mx="auto"
        >
            <SimpleGrid
                alignItems="center"
                columns={{ base: 1, md: 2 }}
                flexDirection="column-reverse"
                spacingY={{ base: 10, md: 32 }}
                spacingX={{ base: 10, md: 24 }}
            >
                <Box order={{ base: "initial", md: 2 }}>
                    <Heading
                        as="h2"
                        mb={4}
                        fontSize={{ base: "2xl", md: "4xl" }}
                        fontWeight="extrabold"
                        letterSpacing="tight"
                        textAlign={{ base: "center", md: "left" }}
                        color="gray.900"
                        _dark={{ color: "gray.400" }}
                        lineHeight={{ md: "shorter" }}
                    >
                        Seamless Team Collaboration
                    </Heading>
                    <Text
                        as="p"
                        mb={5}
                        textAlign={{ base: "center", sm: "left" }}
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                        fontSize={{ md: "lg" }}
                    >
                        Work together on templates with your team
                    </Text>
                    <Button
                        w={{ base: "full", sm: "auto" }}
                        size="lg"
                        bg="gray.900"
                        _dark={{ bg: "gray.700" }}
                        _hover={{
                            bg: "gray.700",
                            _dark: { bg: "gray.600" },
                        }}
                        color="gray.100"
                        as="a"
                    >
                        Get Started Now
                    </Button>
                </Box>
                <Image
                    w="full"
                    h="full"
                    py={4}
                    src="/collaboration.png"
                    alt=""
                    // loading="lazy"
                />
            </SimpleGrid>
        </Box>
    );
};

export default SBSHero;
