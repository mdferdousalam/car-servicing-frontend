import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import carWash from "../assets/blue-car-wash.jpg";

export default function AboutPage() {
  const bg = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box bg={bg} py={10}>
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
      >
        {/* About Image */}
        <Box flex="1" textAlign="center">
          <Image
            borderRadius="md"
            src={carWash}
            alt="About Us"
            boxShadow="lg"
            maxW="full"
            h="auto"
          />
        </Box>

        {/* About Text */}
        <VStack
          flex="1"
          align="flex-start"
          spacing={5}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading as="h1" size="2xl" color="teal.500">
            About Us
          </Heading>
          <Text fontSize="lg" color={textColor}>
            Welcome to BEST CAR WASH, where innovation meets excellence. Our
            mission is to provide top-notch services and solutions that cater to
            the unique needs of our clients. With a dedicated team of
            professionals and a commitment to quality, we strive to deliver
            results that exceed expectations.
          </Text>
          <Text fontSize="lg" color={textColor}>
            Established in 2024, our company has grown from a small startup to a
            leader in the industry. We pride ourselves on our customer-centric
            approach, ensuring that every project is handled with the utmost
            care and professionalism.
          </Text>
          <Text fontSize="lg" color={textColor}>
            Whether you're looking for car wash, car servicing we're here to
            help you achieve your goals with innovative solutions and
            exceptional service.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}
