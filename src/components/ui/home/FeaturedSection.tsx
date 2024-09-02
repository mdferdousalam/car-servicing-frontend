import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import detailing from "../../../assets/detailing.jpg";
import engine from "../../../assets/engine.jpg";
import exterior from "../../../assets/exterior.jpg";
import interior from "../../../assets/interior.jpg";
import tyre from "../../../assets/tyre.jpg";
import wax from "../../../assets/wax.jpg";
const services = [
  {
    title: "Exterior Wash",
    description: "A thorough exterior wash to make your car shine.",
    image: exterior,
  },
  {
    title: "Interior Cleaning",
    description: "Deep cleaning for a fresh and comfortable interior.",
    image: interior,
  },
  {
    title: "Wax & Polish",
    description: "Protect and enhance your car’s paintwork.",
    image: wax,
  },
  {
    title: "Engine Cleaning",
    description: "Professional engine cleaning for optimal performance.",
    image: engine,
  },
  {
    title: "Tire & Wheel Cleaning",
    description: "Detailed tire and wheel cleaning for a polished look.",
    image: tyre,
  },
  {
    title: "Complete Detailing",
    description: "Comprehensive car detailing for ultimate care.",
    image: detailing,
  },
];

const FeaturedServices: React.FC = () => {
  return (
    <Box py={20} maxW="7xl" mx="auto" px={4}>
      <Heading as="h2" size="xl" mb={10} textAlign="center">
        Our Featured Services
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {services.map((service, index) => (
          <Box
            key={index}
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            bg="white"
          >
            <Image src={service.image} alt={service.title} />
            <Box p={6}>
              <Heading as="h3" size="md" mb={4}>
                {service.title}
              </Heading>
              <Text>{service.description}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeaturedServices;
