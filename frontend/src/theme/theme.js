import { extendTheme } from "@chakra-ui/react";

const colors = {
    brand: {
        50: "#ecefff",
        100: "#cbceeb",
        200: "#a9aed6",
        300: "#888ec5",
        400: "#666db3",
        500: "#4d5499",
        600: "#3c4178",
        700: "#2a2f57",
        800: "#181c37",
        900: "#080819",
    },
};

const components = {
    components: {
        Drawer: {
            variants: {
                permanent: {
                    dialogContainer: {
                        width: 0,
                    },
                },
            },
        },
    },
};

const theme = {
    components,
    colors,
    config: { initialColorMode: "dark", useSystemColorMode: true },
};

export default extendTheme(theme);
