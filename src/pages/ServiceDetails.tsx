import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Container,
} from "@chakra-ui/react";
import { FaRegClock } from "react-icons/fa";
import { useGetServiceByIdQuery } from "../redux/features/service/serviceApi";
import { FindSlot } from "../components/ui/slot/FindSlot";



const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useGetServiceByIdQuery(id);

  if (isLoading) {
    return (
      <Container>
        <Box py={12} textAlign="center">
          <Spinner size="xl" />
          <Text mt={4} color="gray.500">
            Loading...
          </Text>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Box py={12} textAlign="center">
          <Alert status="error">
            <AlertIcon />
            An error occurred while fetching service details.
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <Box py={12} textAlign="center">
          <Text color="gray.500">No service details available.</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box py={12}>
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="gray.100"
          rounded="lg"
          shadow="xl"
          minH="19rem"
        >
          <Box
            position="relative"
            w={{ base: "100%", md: "40%" }}
            h="100%"
            overflow="hidden"
            roundedTop={{ base: "lg", md: "none" }}
            roundedLeft={{ base: "none", md: "lg" }}
            minH="19rem"
          >
            <Image
              src={data.data.image}
              alt={data.data.name}
              objectFit="cover"
              w="100%"
              h="100%"
            />
            <Box
              position="absolute"
              inset="0"
              bg="blue.600"
              opacity={0.35}
            ></Box>
          </Box>
          <Flex
            direction="column"
            w={{ base: "100%", md: "60%" }}
            p={{ base: 6, md: 12 }}
            bg="gray.100"
            roundedRight="lg"
          >
            <Heading as="h2" size="lg" color="blue.600" mb={2}>
              {data.data.name}
            </Heading>
            <Text color="gray.600" mb={4}>
              {data.data.description}
            </Text>
            <Flex alignItems="center" gap={4}>
              <Flex alignItems="center" fontSize="lg">
                <FaRegClock />
                <Text ml={2}>{data.data.duration}m</Text>
              </Flex>
              <Text fontSize="lg">${data.data.price}</Text>
            </Flex>
          </Flex>
        </Flex>

        <Box mt={12}>
          <FindSlot serviceId={id as string} serviceName={data.data.name} />
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceDetailsPage;
