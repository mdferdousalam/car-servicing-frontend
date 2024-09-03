import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMdTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceCard = ({ service }: any) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/serviceDetails/${service._id}`);
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Box
      bg={bgColor}
      borderRadius="xl"
      shadow="lg"
      p={3}
      cursor="pointer"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
      onClick={handleNavigate}
    >
      <Box
        borderRadius="xl"
        overflow="hidden"
        position="relative"
        h="12rem"
        mb={4}
      >
        <Image
          src={service?.image}
          alt={service?.name}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>

      <Box p={2}>
        <Heading as="h2" size="md" color={textColor} mb={2}>
          {service?.name}
        </Heading>
        <Text fontSize="sm" color={subTextColor} mb={3}>
          {service?.description}
        </Text>

        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            ${service?.price}
          </Text>
          <Button variant="link" color="teal.500" leftIcon={<IoMdTime />}>
            {service?.duration}m
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ServiceCard;
