import { SimpleGrid } from "@chakra-ui/react";
import Feature from "./Feature";
import { TbTemplate } from "react-icons/tb";
import { BiLibrary } from "react-icons/bi";
import { MdDocumentScanner } from "react-icons/md";
import { HiClipboardDocument } from "react-icons/hi2";

const Features = () => {
    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={20}
            px={{ base: 4, lg: 16, xl: 24 }}
            py={20}
            my={4}
            mx="auto"
            bg="#edf3f8"
            _dark={{ bg: "gray.800" }}
            shadow="xl"
        >
            <Feature title="Template Library" icon={<BiLibrary />}>
                Explore a wide range of pre-designed templates
            </Feature>

            <Feature title="Easy-to-Use Editor" icon={<TbTemplate />}>
                Intuitive and user-friendly interface
            </Feature>

            <Feature
                title="Customize Your Documents"
                icon={<MdDocumentScanner />}
            >
                Personalize templates to fit your needs
            </Feature>
            <Feature title="Efficient Workflow" icon={<HiClipboardDocument />}>
                Save time and streamline your document creation
            </Feature>
        </SimpleGrid>
    );
};

export default Features;
