import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaClock, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <Box bg="teal-500" py={6}>
      <Flex
        justify="space-between"
        align="center"
        py={3}
        maxW="7xl"
        mx="auto"
        px={4}
        direction={{ base: "column" }}
      >
        {/* Contact Information */}
        <HStack
          spacing={6}
          color="gray.700"
          fontSize="sm"
          py={3}
          textAlign={{ base: "center", md: "left" }}
          mb={{ base: 4, md: 0 }}
        >
          <Text as="span" display="flex" alignItems="center" gap={1}>
            <FaLocationDot color="teal" /> House 454, Road No: 31, Mohakhali
            DOHS, Dhaka
          </Text>
          <Text as="span" display="flex" alignItems="center" gap={1}>
            <IoCall color="teal" /> 16516 / 8809643240103
          </Text>
          <Text as="span" display="flex" alignItems="center" gap={1}>
            <FaClock color="teal" /> Mon - Sat: 07:00AM - 06:00PM
          </Text>
        </HStack>

        {/* Social Media Icons */}
        <HStack
          spacing={4}
          color="teal.500"
          justify={{ base: "center", md: "flex-end" }}
        >
          <Link color="teal.500" href="/">
            <FaFacebookF size={20} />
          </Link>
          <Link>
            <FaTwitter color="teal.500" href="/" size={20} />
          </Link>

          <Link color="teal.500" href="/">
            <FaYoutube size={20} />
          </Link>
        </HStack>
      </Flex>

      {/* Footer Bottom Section */}
      <Box textAlign="center" color="gray.700" fontSize="sm" mt={4}>
        <Text>
          © {new Date().getFullYear()} Best Car Wash Service. All rights
          reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
