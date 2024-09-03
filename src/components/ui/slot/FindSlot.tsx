import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Text,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { SelectedSlot, selectSelectedSlots, toggleSlot } from "../../../redux/features/booking/bookingSlice";
import { useGetAvailableSlotsQuery } from "../../../redux/features/slot/slotApi";

interface Slot {
  _id: string;
  time: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked";
}

interface ApiError {
  data?: {
    message?: string;
  };
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const FindSlot: React.FC<{ serviceId: string; serviceName: string }> = ({
  serviceId,
  serviceName,
}) => {
  const [value, onChange] = useState<Value>(new Date());
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedSlots = useAppSelector(selectSelectedSlots);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = Array.isArray(value)
    ? value.map((date) => date && formatDate(date)).join(" to ")
    : value && formatDate(value);

  const date = formattedDate?.toString();

  const {
    data: slots,
    error,
    isLoading,
  } = useGetAvailableSlotsQuery({
    serviceId,
    date,
  });

  useEffect(() => {
    if (slots) {
      setAvailableSlots(slots.data);
    }
  }, [slots]);

  const handleCheckboxChange = (
    slotId: string,
    isBooked: "available" | "booked",
    startTime: string,
    endTime: string
  ) => {
    if (isBooked === "available") {
      const slot: SelectedSlot = {
        serviceId,
        slotId,
        serviceName,
        startTime,
        endTime,
        date: formattedDate || "",
        status: "upcoming",
      };

      // Dispatch action to toggle slot
      dispatch(toggleSlot(slot));
    }
  };

  const handleNavigate = () => {
    navigate("/booking");
  };

  const isConfirmEnabled = selectedSlots.length > 0;

  return (
    <Box className="slot-selection" mt={4}>
      <Box className="calendar-container" mb={6}>
        <Calendar onChange={onChange} value={value} />
      </Box>
      <Box className="available-time-slots">
        {formattedDate && (
          <Box className="selected-date" mb={4}>
            <Text color="gray.800" fontWeight="bold">
              Selected Date: {date}
            </Text>
          </Box>
        )}
        {isLoading && (
          <Flex justifyContent="center" alignItems="center" height="245px">
            <Spinner size="lg" />
          </Flex>
        )}
        {error && (
          <Alert
            status="error"
            height="245px"
            justifyContent="center"
            alignItems="center"
          >
            <AlertIcon />
            {(error as ApiError).data?.message}
          </Alert>
        )}
        {!error && availableSlots.length > 0 && (
          <Table
            variant="simple"
            bg="white"
            border="1px"
            borderColor="gray.300"
          >
            <Thead bg="gray.200">
              <Tr>
                <Th textAlign="center" fontSize="sm">
                  Time Slot
                </Th>
                <Th textAlign="center" fontSize="sm">
                  Availability
                </Th>
                <Th textAlign="center" fontSize="sm">
                  Select
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {availableSlots.map((slot) => (
                <Tr
                  key={slot._id}
                  bg={slot.isBooked === "booked" ? "gray.50" : "white"}
                  cursor={
                    slot.isBooked === "available" ? "pointer" : "not-allowed"
                  }
                  opacity={slot.isBooked === "booked" ? 0.6 : 1}
                >
                  <Td textAlign="center">
                    {slot.startTime} - {slot.endTime}
                  </Td>
                  <Td textAlign="center">
                    <Text
                      color={
                        slot.isBooked === "available" ? "green.500" : "red.500"
                      }
                      fontWeight="bold"
                    >
                      {slot.isBooked === "available"
                        ? "Available"
                        : "Not Available"}
                    </Text>
                  </Td>
                  <Td textAlign="center">
                    <Checkbox
                      isChecked={selectedSlots.some(
                        (selected) => selected.slotId === slot._id
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          slot._id,
                          slot.isBooked,
                          slot.startTime,
                          slot.endTime
                        )
                      }
                      isDisabled={slot.isBooked === "booked"}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Flex justifyContent="flex-end" mt={4}>
          <Button
            colorScheme="blue"
            onClick={handleNavigate}
            isDisabled={!isConfirmEnabled}
          >
            Go To Booking Page
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
