import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Image,
    Divider,
    Stack,
    Text,
    Heading,
    Center,
    HStack,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTemplate } from "../../util/API/fetchApi";

/**
 * Generates a document card with the proper image, name, upload date and buttons (with UUID)
 *
 * @param {string} docName {The name of the uploaded document}
 * @param {Date} docName {The date of the uploaded document}
 * @param {UUID} uuid {the uuid of the uploaded document, used for info retrieval}
 */
const DocumentCard = ({ docName, uploadDate, uuid, onDeleteDocument }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteModal = () => {
        return (
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <Center>Delete Template</Center>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <b>Are you sure you want to delete:</b>
                            <br />
                            <br />
                            <p>{docName}</p>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                No
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    deleteTemplate(uuid);
                                    onDeleteDocument(uuid);
                                }}
                            >
                                Yes
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    };
    return (
        <>
            {deleteModal()}
            <Card maxW="sm" key={uuid}>
                <CardBody>
                    <Image
                        src="/DocPlaceholder.png"
                        alt="Document"
                        borderRadius="xl"
                    />
                    <Center>
                        <Stack mt="6" spacing="3">
                            <Heading size="md">{docName}</Heading>
                            <Text>Date uploaded:</Text>
                            <Text>{uploadDate}</Text>
                        </Stack>
                    </Center>
                </CardBody>
                <Divider />
                <Center>
                    <CardFooter>
                        <HStack spacing="10">
                            <Link to={`/filltemplate/${uuid}`}>
                                <Button variant="solid" colorScheme="blue">
                                    Fill In
                                </Button>
                            </Link>
                            <Center>
                                <IconButton
                                    icon={<DeleteIcon color="red.500" />}
                                    bg="transparent"
                                    // onClick={() => {
                                    //     deleteTemplate(uuid);
                                    //     onDeleteDocument(uuid);
                                    // }}
                                    onClick={onOpen}
                                />
                            </Center>
                        </HStack>
                    </CardFooter>
                </Center>
            </Card>
        </>
    );
};

export default DocumentCard;
