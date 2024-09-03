import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { removeSlot, SelectedSlot, selectSelectedSlots } from "../redux/features/booking/bookingSlice";
import useCurrentUser from "../hooks/useCurrentUser";


interface ApiResponse {
  success: boolean;
  paymentUrl: string;
}

export default function BookingPage() {
  const dispatch = useAppDispatch();
  const { userData } = useCurrentUser();
  const bookingSlotsDataFromState: SelectedSlot[] =
    useAppSelector(selectSelectedSlots);

  const [userName, setUserName] = useState(userData?.name || "");
  const [userEmail, setUserEmail] = useState(userData?.email || "");
  const [selectedService, setSelectedService] = useState<SelectedSlot[]>([]);

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || "");
      setUserEmail(userData.email || "");
    }

    if (bookingSlotsDataFromState.length > 0) {
      setSelectedService(bookingSlotsDataFromState);
    }
  }, [userData, bookingSlotsDataFromState]);

  const handlePayment = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data: ApiResponse = {
        success: true,
        paymentUrl: "https://aamarpay.example.com/checkout",
      };

      if (data.success) {
        window.location.href = data.paymentUrl;
      } else {
        console.error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleRemoveSlot = (slotId: string, serviceId: string) => {
    dispatch(removeSlot({ slotId, serviceId }));
  };

  const isConfirmEnabled = selectedService.length > 0;

  return (
    <Flex direction={{ base: "column", md: "row" }} p={8} gap={8}>
      <Box
        w={{ base: "100%", md: "50%" }}
        bg="white"
        p={4}
        shadow="lg"
        rounded="lg"
      >
        {selectedService.length > 0 ? (
          selectedService.map((ser, index) => (
            <Flex
              key={index}
              align="center"
              gap={4}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
            >
              <Box flex="1">
                <Heading as="h3" size="md">
                  {ser?.serviceName}
                </Heading>
                <Flex mt={2} gap={4}>
                  <Text>Date: {ser?.date}</Text>
                  <Text>
                    Time: {ser?.startTime} - {ser?.endTime}
                  </Text>
                </Flex>
              </Box>
              <IconButton
                aria-label="Remove slot"
                icon={<FaTrashAlt />}
                colorScheme="red"
                onClick={() => handleRemoveSlot(ser.slotId, ser.serviceId)}
              />
            </Flex>
          ))
        ) : (
          <Flex align="center" justify="center" w="full" h="full" p={4}>
            <Text color="gray.500">No service or slot selected.</Text>
          </Flex>
        )}
      </Box>

      <Box
        w={{ base: "100%", md: "50%" }}
        bg="white"
        p={4}
        shadow="lg"
        rounded="lg"
      >
        <Heading as="h2" size="lg" mb={4}>
          Booking Details
        </Heading>
        <form>
          <FormControl id="userName" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="userEmail" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            onClick={handlePayment}
            isDisabled={!isConfirmEnabled}
          >
            Pay Now
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
