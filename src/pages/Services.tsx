import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllServicesQuery } from "../redux/features/service/serviceApi";
import ServiceCard from "../components/ui/service/ServiceCard";

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  image: string;
}

export default function ServicesPage() {
  const { data, error, isLoading } = useGetAllServicesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!data) return;

    let updatedServices = data.data as Service[];

    if (searchTerm) {
      updatedServices = updatedServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy) {
      updatedServices = updatedServices.filter((service) => {
        if (filterBy === "low-price") return service.price <= 100;
        if (filterBy === "high-price") return service.price > 100;
        if (filterBy === "short-duration") return service.duration <= 60;
        if (filterBy === "long-duration") return service.duration > 60;
        return true;
      });
    }

    if (sortBy === "price-asc") {
      updatedServices = updatedServices.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      updatedServices = updatedServices.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration-asc") {
      updatedServices = updatedServices.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "duration-desc") {
      updatedServices = updatedServices.sort((a, b) => b.duration - a.duration);
    }

    setFilteredServices(updatedServices);
  }, [data, searchTerm, filterBy, sortBy]);

  const handleCancel = () => {
    setSearchTerm("");
    setFilterBy("");
    setSortBy("");
    if (data) {
      setFilteredServices(data.data as Service[]);
    }
  };

  if (isLoading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading services
      </Alert>
    );

  return (
    <Box bg="#F0F3FF" py={12}>
      <Box textAlign="center" mb={8}>
        <Heading as="h2" size="lg" color="#0068d8">
          Our Services
        </Heading>
        <Heading as="h3" size="xl" color="#0e111b" mt={2}>
          We are dedicated to providing our best service to you
        </Heading>
        <Text fontSize="md" color="#424649" mt={4}>
          At our company, we provide a range of high-quality services designed
          to meet your needs and exceed your expectations.
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        mb={6}
      >
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={{ base: 4, md: 0 }}
          aria-label="Search services"
        />
        <FormControl mb={{ base: 4, md: 0 }}>
          <FormLabel htmlFor="filterBy">Filter by</FormLabel>
          <Select
            id="filterBy"
            placeholder="Select filter"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="low-price">Low Price</option>
            <option value="high-price">High Price</option>
            <option value="short-duration">Short Duration</option>
            <option value="long-duration">Long Duration</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="sortBy">Sort by</FormLabel>
          <Select
            id="sortBy"
            placeholder="Select sorting option"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration-asc">Duration: Short to Long</option>
            <option value="duration-desc">Duration: Long to Short</option>
          </Select>
        </FormControl>
        <Button colorScheme="red" onClick={handleCancel} ml={{ md: 4 }}>
          Cancel
        </Button>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {filteredServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
