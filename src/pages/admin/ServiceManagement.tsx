import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  useDeleteServiceByIdMutation,
  useGetAllServicesQuery,
} from "../../redux/features/service/serviceApi";
import AddServiceModal from "./AddServiceModal";


interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

const ServiceManagement = () => {
  const { data: services } = useGetAllServicesQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false); // Corrected state name
  const [deleteService] = useDeleteServiceByIdMutation();
  const toast = useToast();

const toggleModal = () => {
  console.log("Modal open state before:", isModalOpen); // Add this to debug
  setIsModalOpen(!isModalOpen);
  console.log("Modal open state after:", !isModalOpen); // Add this to debug
};


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
      toast({
        title: "Service deleted.",
        description: "The service has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* Top bar with Add Service button */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="lg" color="gray.800">
          Service Management
        </Heading>
        <Button
          onClick={toggleModal}
          colorScheme="blue"
          bgGradient="linear(to-r, blue.500, blue.600)"
          _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)" }}
        >
          Add Service
        </Button>
      </Flex>
      {/* Table with service data */}
      <Box overflowX="auto" bg="white" shadow="md" rounded="lg">
        <Table minW="max-content" variant="simple">
          <Thead bg="blue.100">
            <Tr>
              {[
                "Image",
                "Name",
                "Description",
                "Duration",
                "Price",
                "Actions",
              ].map((heading) => (
                <Th
                  key={heading}
                  py={4}
                  borderBottom="2px"
                  borderColor="blue.200"
                >
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {services?.data?.map((service: Service, index: number) => (
              <Tr key={service._id} bg={index % 2 === 0 ? "gray.50" : "white"}>
                <Td py={4}>
                  <Image
                    src={service.image}
                    alt={service.name}
                    boxSize="16"
                    objectFit="cover"
                    rounded="lg"
                  />
                </Td>
                <Td py={4}>
                  <Box color="gray.700" fontSize="sm">
                    {service.name}
                  </Box>
                </Td>
                <Td py={4}>
                  <Box color="gray.700" fontSize="sm">
                    {service.description}
                  </Box>
                </Td>
                <Td py={4}>
                  <Box color="gray.700" fontSize="sm">
                    {service.duration}
                  </Box>
                </Td>
                <Td py={4}>
                  <Box color="gray.700" fontSize="sm">
                    {service.price}
                  </Box>
                </Td>
                <Td py={4}>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="Edit Service"
                      icon={<EditIcon />}
                      colorScheme="yellow"
                      variant="solid"
                    />
                    <IconButton
                      aria-label="Delete Service"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleDelete(service._id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* Simplified Modal for Debugging */}
  
      {/* Add Service Modal */}
      {isModalOpen && <AddServiceModal toggleModal={toggleModal} />}{" "}
      {/* Ensure toggleModal is passed correctly */}
    </Box>
  );
};

export default ServiceManagement;
