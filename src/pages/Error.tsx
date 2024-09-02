import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="#f8f8f8"
      textAlign="center"
      px={4}
    >
      <Heading as="h1" size="2xl" mb={4} color="teal.500">
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mb={8}>
        Oops! The page you are looking for does not exist.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="teal" onClick={handleGoHome}>
          Go to Home
        </Button>
        <Button variant="outline" colorScheme="teal" onClick={handleLogin}>
          Go to Login
        </Button>
      </VStack>
    </Box>
  );
}
