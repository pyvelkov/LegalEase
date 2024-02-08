import React from "react";

import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    HStack,
    Button,
    useDisclosure,
    VStack,
    IconButton,
    CloseButton,
    Image,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import ToggleColorMode from "./ToggleColorMode";

const Header = () => {
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();

    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
                shadow="md"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                >
                    <Flex>
                        {/* <chakra.a
                            href="/"
                            title="Choc Home Page"
                            display="flex"
                            alignItems="center"
                        > */}
                        <Link
                            to={`/`}
                            title="Home"
                            // alignItems="center"
                            align-items="center"
                        >
                            <Image
                                src="/LegalEase_Logo.svg"
                                alt="Logo"
                                display={mobileNav.isOpen ? "none" : "flex"}
                                borderRadius="xl"
                                width="80px"
                                height="80px"
                            />
                        </Link>
                        {/* </chakra.a> */}
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <HStack
                            spacing={1}
                            mr={1}
                            color="brand.500"
                            display={{ base: "none", md: "inline-flex" }}
                        >
                            <Button variant="ghost">Features</Button>
                            <Button variant="ghost">Pricing</Button>
                            <Button variant="ghost">About Us</Button>
                            <Button variant="ghost">Sign in</Button>
                        </HStack>
                        <Button
                            colorScheme="brand"
                            size="sm"
                            display={mobileNav.isOpen ? "none" : "flex"}
                        >
                            Get Started
                        </Button>
                        <ToggleColorMode />
                        <Box display={{ base: "inline-flex", md: "none" }}>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="20px"
                                color="gray.800"
                                _dark={{ color: "inherit" }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />

                            <VStack
                                pos="absolute"
                                top={0}
                                left={0}
                                right={0}
                                display={mobileNav.isOpen ? "flex" : "none"}
                                flexDirection="row"
                                p={2}
                                pb={4}
                                pt={2}
                                m={2}
                                bg={bg}
                                spacing={4}
                                rounded="sm"
                                shadow="sm"
                            >
                                <Button w="full" variant="ghost">
                                    Features
                                </Button>
                                <Button w="full" variant="ghost">
                                    Pricing
                                </Button>

                                <Button w="full" variant="ghost">
                                    About Us
                                </Button>
                                <Button w="full" variant="ghost">
                                    Sign in
                                </Button>
                                <CloseButton
                                    aria-label="Close menu"
                                    onClick={mobileNav.onClose}
                                />
                            </VStack>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    );
};
export default Header;
