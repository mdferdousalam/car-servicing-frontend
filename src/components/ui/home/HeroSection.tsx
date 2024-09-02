import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import brandImage from "../../../assets/home.jpg";
const HeroSection: React.FC = () => {
  return (
    <Box bg="teal.500" color="white" py={20}>
      <Flex maxW="7xl" mx="auto" px={4} align="center" justify="space-between">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Premium Car Wash Services
          </Heading>
          <Text fontSize="lg" mb={6}>
            Experience the best car wash services with eco-friendly products and
            exceptional care.
          </Text>
          <Button colorScheme="white" variant="outline" size="lg">
            Book Your Service Now
          </Button>
        </Box>
        <Image
          src={brandImage}
          alt="Car Wash"
          boxSize="400px"
          borderRadius="md"
          boxShadow="lg"
        />
      </Flex>
    </Box>
  );
};

export default HeroSection;
