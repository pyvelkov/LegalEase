import { FormControl, FormLabel, GridItem, Input } from "@chakra-ui/react";

const NumField = ({ name, value, onChange, reviewMode, defaults }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };
    return (
        <>
            <FormControl as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                    htmlFor={name}
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{ color: "gray.50" }}
                >
                    {name}
                </FormLabel>
                <Input
                    defaultValue={defaults}
                    disabled={reviewMode}
                    type="number"
                    name={name}
                    id={name}
                    mt={1}
                    value={value}
                    onChange={handleChange}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
        </>
    );
};

export default NumField;
