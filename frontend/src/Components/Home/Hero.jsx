import {
    Box,
    useColorModeValue,
    Icon,
    Image,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Hero = () => {
    const bg = useColorModeValue("white", "gray.800");
    return (
        <Box pos="relative" overflow="hidden" bg={bg} mt={10}>
            <Box maxW="7xl" mx="auto">
                <Box
                    pos="relative"
                    pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                    maxW={{ lg: "2xl" }}
                    w={{ lg: "full" }}
                    zIndex={1}
                    bg={bg}
                    border="solid 1px transparent"
                >
                    <Icon
                        display={{ base: "none", lg: "block" }}
                        position="absolute"
                        right={0}
                        top={0}
                        bottom={0}
                        h="full"
                        w={48}
                        color={bg}
                        transform="translateX(50%)"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </Icon>
                    <Box
                        mx="auto"
                        maxW={{ base: "7xl" }}
                        px={{ base: 2, sm: 4, lg: 0 }}
                        mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
                    >
                        <Box
                            w="full"
                            textAlign={{ sm: "center", lg: "left" }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Heading
                                as="h1"
                                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                                letterSpacing="tight"
                                lineHeight="short"
                                fontWeight="extrabold"
                                color="gray.900"
                                _dark={{ color: "white" }}
                            >
                                <Text
                                    as="span"
                                    display={{ base: "block", xl: "inline" }}
                                >
                                    Welcome to <br />
                                </Text>
                                <Text
                                    as="span"
                                    display={{ base: "block", xl: "inline" }}
                                    color="brand.600"
                                    _dark={{ color: "brand.400" }}
                                >
                                    LegalEase
                                </Text>
                            </Heading>
                            <Text
                                as="p"
                                mt={{ base: 3, sm: 5, md: 5 }}
                                fontSize={{ sm: "lg", md: "xl" }}
                                maxW={{ sm: "xl" }}
                                mx={{ sm: "auto", lg: 0 }}
                                color="gray.500"
                            >
                                LegalEase is a powerful document templating
                                application, allowing you to create and
                                customize professional documents with ease.
                            </Text>
                            <Box
                                mt={{ base: 5, sm: 8 }}
                                display={{ sm: "flex" }}
                                justifyContent={{ sm: "center", lg: "start" }}
                                fontWeight="extrabold"
                                fontFamily="fantasy"
                            >
                                {/* <Box rounded="full" shadow="md">
                                    <Link to="/">
                                        <Button
                                            w="full"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            border="solid 1px transparent"
                                            fontSize={{ base: "md", md: "lg" }}
                                            rounded="md"
                                            color="white"
                                            bg="brand.600"
                                            _hover={{ bg: "brand.700" }}
                                            px={{ base: 8, md: 10 }}
                                            py={{ base: 3, md: 4 }}
                                            cursor="pointer"
                                        >
                                            Create New Template
                                        </Button>
                                    </Link>
                                </Box> */}
                                <Box mt={[3, 0]} ml={[null, 3]}>
                                    <Link to="/fillTemplate">
                                        <Button
                                            w="full"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            border="solid 1px transparent"
                                            fontSize={{ base: "md", md: "lg" }}
                                            rounded="md"
                                            color="white"
                                            bg="brand.600"
                                            _hover={{ bg: "brand.700" }}
                                            px={{ base: 8, md: 10 }}
                                            py={{ base: 3, md: 4 }}
                                            cursor="pointer"
                                        >
                                            Fill Template
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                position={{ lg: "absolute" }}
                top={{ lg: 0 }}
                bottom={{ lg: 0 }}
                right={{ lg: 0 }}
                w={{ lg: "50%" }}
                border="solid 1px transparent"
            >
                <Image
                    h={[56, 72, 96, "full"]}
                    w="full"
                    fit="cover"
                    src="/DocumentGeneration.jpg"
                    alt=""
                    loading="lazy"
                />
            </Box>
        </Box>
    );
};

export default Hero;
