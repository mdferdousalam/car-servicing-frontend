import React, { ReactNode } from "react";
import { Box, Flex, Text, Heading, Icon } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={6}
      bg="white"
      shadow="md"
      _dark={{ borderColor: "gray.700", bg: "gray.800" }}
    >
      <Flex
        align="center"
        justify="center"
        w="46px"
        h="46px"
        borderRadius="full"
        bg="gray.100"
        _dark={{ bg: "gray.600" }}
      >
        {children}
      </Flex>

      <Flex mt={4} align="end" justify="space-between">
        <Box>
          <Heading
            as="h4"
            size="md"
            fontWeight="bold"
            color="black"
            _dark={{ color: "white" }}
          >
            {total}
          </Heading>
          <Text fontSize="sm" fontWeight="medium">
            {title}
          </Text>
        </Box>

        <Flex
          align="center"
          gap={1}
          fontSize="sm"
          fontWeight="medium"
          color={levelUp ? "green.500" : levelDown ? "red.500" : "black"}
        >
          {rate}
          {levelUp && <Icon as={TriangleUpIcon} boxSize={3} />}
          {levelDown && <Icon as={TriangleDownIcon} boxSize={3} />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardDataStats;
