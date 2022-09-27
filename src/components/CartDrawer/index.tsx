import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import type { useDisclosure } from "@chakra-ui/react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
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
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import type { ProductInfoProps } from "../ProductInfo";
import PromoCode from "../PromoCode";

export type CartDrawerProps = {
  cart: ProductInfoProps[];
};

const CartDrawer: React.FC<
  CartDrawerProps &
    ReturnType<typeof useDisclosure> & {
      updateQuantity: (id: number, quantity: number) => void;
      removeProduct: (product: ProductInfoProps) => void;
    }
> = ({ cart, isOpen, onOpen, onClose, updateQuantity, removeProduct }) => {
  const [size, setSize] = useState<"md" | "full">("md");
  const isFull = size === "full";
  const bgColor = useColorModeValue("white", "gray.700");
  const bgColorFull = useColorModeValue("#f1f2f4", "gray.700");

  const CheckoutInfo = (
    <Flex w="full">
      {isFull && (
        <Box w={isFull ? "md" : "full"}>
          <PromoCode />
        </Box>
      )}
      {isFull && <Spacer />}
      <VStack w={isFull ? "md" : "full"} spacing="4">
        <Flex w="full">
          <Text>Total</Text>
          <Spacer />
          <Text>
            $
            {cart.reduce((sum, { quantity: qt, price }) => {
              return sum + qt * price;
            }, 0)}
          </Text>
        </Flex>
        <Button
          w="full"
          onClick={() => {
            onClose();
            setSize("md");
          }}
        >
          Checkout
        </Button>
        {!isFull && (
          <Button
            variant="link"
            pb="5"
            onClick={() => {
              onClose();
              setTimeout(() => {
                setSize("full");
                onOpen();
              }, 100);
            }}
          >
            <b>View detailed cart</b>
          </Button>
        )}
      </VStack>
    </Flex>
  );

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setSize("md");
      }}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent bg={isFull ? bgColorFull : bgColor}>
        <DrawerCloseButton />
        {!isFull && <DrawerHeader>Cart summary</DrawerHeader>}

        <DrawerBody>
          <Container maxW="container.xl">
            {!isFull ? (
              <Divider mb="10" borderBottomWidth="3px" />
            ) : (
              <Flex h="20" mb="3" alignItems="center">
                <Center>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onClose();
                      setSize("md");
                    }}
                  >
                    <ArrowBackIcon mr="2" color="brand.500" />
                    Continue shopping
                  </Button>
                </Center>
                <Spacer />
                <Center fontSize="20">Cart summary</Center>
                <Spacer />
                <Button variant="ghost"> Sign in </Button>
              </Flex>
            )}
            <VStack
              spacing={isFull ? 6 : 8}
              divider={isFull ? undefined : <Divider />}
            >
              {cart.length ? (
                cart.map(
                  ({ id, name, photo, inventory, desc, quantity, price }) => (
                    <VStack
                      w="full"
                      spacing="4"
                      key={id}
                      bg={bgColor}
                      p={isFull ? 6 : 0}
                      boxShadow={
                        isFull ? "0 20px 24px -20px rgb(0 0 0 / 10%)" : "none"
                      }
                    >
                      <Flex w="full">
                        <HStack spacing="4">
                          <Image
                            h={isFull ? "28" : "10"}
                            src={photo}
                            alt="naruto"
                            objectFit="cover"
                          />
                          <VStack alignItems="flex-start">
                            <Text fontSize={isFull ? "20" : "16"}>{name}</Text>
                            {isFull && (
                              <Text fontSize="14" maxW="lg">
                                {desc}
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                        <Spacer />
                        <Center>
                          <Button
                            variant="link"
                            onClick={() =>
                              removeProduct({
                                id,
                                name,
                                photo,
                                inventory,
                                desc,
                                quantity,
                                price,
                              })
                            }
                          >
                            <Avatar
                              bg="brand.100"
                              icon={<DeleteIcon color="brand.500" />}
                            />
                          </Button>
                        </Center>
                      </Flex>
                      <Flex w={isFull ? "xs" : "full"} alignSelf="flex-end">
                        <FormControl w="50%">
                          <FormLabel fontSize={12}>QUANTITY</FormLabel>
                          <NumberInput
                            defaultValue={1}
                            min={1}
                            max={inventory}
                            value={quantity}
                            onChange={(val) =>
                              updateQuantity(id, parseInt(val))
                            }
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                        <Spacer />
                        <Center pt="6">${price}</Center>
                      </Flex>
                    </VStack>
                  )
                )
              ) : (
                <Center color="gray.300" h="80">
                  no data
                </Center>
              )}
              {!isFull && <PromoCode />}
            </VStack>
            {isFull && (
              <Box pt="20" pb="32">
                {CheckoutInfo}
              </Box>
            )}
          </Container>
        </DrawerBody>

        <DrawerFooter>{!isFull && CheckoutInfo}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
