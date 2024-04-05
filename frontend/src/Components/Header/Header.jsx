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
    Avatar,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import ToggleColorMode from "./ToggleColorMode";
import LoginButton from "../Login/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Login/LogoutButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";

const Header = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
        useAuth0();

    const updateToken = async () => {
        try {
            if (token == "") {
                const accessToken = await getAccessTokenSilently();
                dispatch(setToken(accessToken));
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        updateToken();
    }, [token]);

    console.log(token);

    return (
        <>
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
                            <Skeleton isLoaded={!isLoading}>
                                <LoginButton Hstack={true} />
                                <LogoutButton Hstack={true} />
                            </Skeleton>
                        </HStack>
                        <Button
                            colorScheme="brand"
                            size="sm"
                            display={mobileNav.isOpen ? "none" : "flex"}
                        >
                            Get Started
                        </Button>
                        {isAuthenticated ? (
                            <SkeletonCircle isLoaded={!isLoading}>
                                <Avatar
                                    size="sm"
                                    mx={5}
                                    name={user.name}
                                    src={user.picture}
                                />
                            </SkeletonCircle>
                        ) : (
                            <Avatar size="sm" ml={5} src="https:brokenlink" />
                        )}
                        <div style={{ marginLeft: isAuthenticated ? 20 : 0 }}>
                            <ToggleColorMode />
                        </div>
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
                                <Skeleton isLoaded={!isLoading}>
                                    <LoginButton Hstack={false} />
                                    <LogoutButton Hstack={false} />
                                </Skeleton>
                                <CloseButton
                                    aria-label="Close menu"
                                    onClick={mobileNav.onClose}
                                />
                            </VStack>
                        </Box>
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
};
export default Header;
