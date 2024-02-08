import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleColorMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            isRound={true}
            size="md"
            fontSize="lg"
            color="currentcolor"
            ml={{ base: "0", md: "3" }}
            onClick={() => {
                toggleColorMode();
            }}
            icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
            variant="ghost"
        />
    );
};

export default ToggleColorMode;
