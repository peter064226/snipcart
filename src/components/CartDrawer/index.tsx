import type { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import type { ProductInfoProps } from "../ProductInfo";

export type CartDrawerProps = {
  products: ProductInfoProps[];
};

const CartDrawer: React.FC<
  CartDrawerProps & ReturnType<typeof useDisclosure>
> = ({ products, isOpen, onClose }) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart summary</DrawerHeader>

          <DrawerBody>
            <Divider mb="10" borderBottomWidth="3px" />
            <VStack spacing="8" divider={<Divider />}>
              {products.map(({ id, name, photo, inventory }) => (
                <VStack w="full" spacing="4" key={id}>
                  <Flex w="full">
                    <HStack>
                      <Image
                        h="10"
                        src={photo}
                        alt="naruto"
                        objectFit="cover"
                      />
                      <Text>{name}</Text>
                    </HStack>
                    <Spacer />
                    <Center>X</Center>
                  </Flex>
                  <Flex w="full">
                    <FormControl w="50%">
                      <FormLabel fontSize={12}>QUANTITY</FormLabel>
                      <NumberInput defaultValue={1} min={1} max={inventory}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <Spacer />
                    <Center pt="6">$704.87</Center>
                  </Flex>
                </VStack>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack w="full" spacing="4">
              <Flex w="full">
                <Text>Shipping and taxes will be calculated at checkout</Text>
                <Spacer />
                <Center>-$49.98</Center>
              </Flex>
              <Flex w="full">
                <Text>Total</Text>
                <Spacer />
                <Text>$704.87</Text>
              </Flex>
              <Button w="full" onClick={onClose}>
                Checkout
              </Button>
              <Button
                variant="link"
                pb="5"
                onClick={() => {
                  onClose();
                }}
              >
                <b>View detailed cart</b>
              </Button>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
