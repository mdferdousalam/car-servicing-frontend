import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Textarea,
  Button,
  HStack,
  Stack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const ReviewSection: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const bg = useColorModeValue("gray.100", "gray.800");

  const handleSubmit = () => {
    setSubmitted(true);
    // Add logic to submit review
  };

  return (
    <Box bg={bg} py={20}>
      <Flex maxW="7xl" mx="auto" px={4} direction="column" align="center">
        <Heading as="h2" size="xl" mb={6}>
          Share Your Feedback
        </Heading>

        {!isLoggedIn && (
          <Box position="relative" width="full">
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.700"
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex={1}
            >
              <Button
                colorScheme="teal"
                onClick={() => (window.location.href = "/login")}
              >
                Login to Leave a Review
              </Button>
            </Box>
          </Box>
        )}

        {isLoggedIn && !submitted && (
          <Stack spacing={4} width="full" maxW="md">
            <HStack spacing={2} justify="center">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  color={index < rating ? "teal.500" : "gray.300"}
                  onClick={() => setRating(index + 1)}
                  cursor="pointer"
                />
              ))}
            </HStack>
            <Textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit Review
            </Button>
          </Stack>
        )}

        {submitted && (
          <Box textAlign="center">
            <Heading as="h3" size="lg" mb={4}>
              Thank You for Your Feedback!
            </Heading>
            <Text>Your review has been submitted.</Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ReviewSection;
