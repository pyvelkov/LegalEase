import { FormControl, FormLabel, GridItem, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const DropDownField = ({
    name,
    value,
    onChange,
    options,
    reviewMode,
    defaults,
    rawTag,
    highlightAllMatchingText,
    removeHighlightText,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    const [rawTagFinal, setrawTagFinal] = useState(rawTag);

    useEffect(() => {
        const replaceChar = (str, index, newChar) => {
            if (index < 0 || index >= str.length) {
                return str;
            }

            return str.slice(0, index) + newChar + str.slice(index + 1);
        };

        let tempTag = replaceChar(rawTag, 1, "#");
        setrawTagFinal(tempTag);
    }, [rawTag]);

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
                <Select
                    defaultValue={defaults}
                    disabled={reviewMode}
                    type="text"
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
                    onFocus={() => {
                        highlightAllMatchingText(rawTagFinal);
                    }}
                    onBlur={() => {
                        removeHighlightText();
                    }}
                >
                    <option value="" disabled hidden>
                        Select {name}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default DropDownField;
