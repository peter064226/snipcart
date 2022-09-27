import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const PromoCode = () => {
  const [editable, setEditable] = useState(false);
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <>
      {editable ? (
        <HStack w="full">
          <InputGroup>
            <Input bg={bgColor} placeholder="Promo Code" />
            <InputRightElement>
              <Button variant="link" mr="5" onClick={() => setEditable(false)}>
                Apply
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button variant="link" onClick={() => setEditable(false)}>
            Cancel
          </Button>
        </HStack>
      ) : (
        <Button variant="outline" w="full" onClick={() => setEditable(true)}>
          Promo code?
        </Button>
      )}
    </>
  );
};

export default PromoCode;
