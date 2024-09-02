import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hook";
import { LoginRequest, useLoginMutation } from "../redux/features/auth/auth";
import { setCredentials } from "../redux/features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [formState, setFormState] = React.useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="lg"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={handleChange}
                    name="email"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  {/* <Link color="teal.500">forgot password?</Link> */}
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isLoading}
                onClick={async () => {
                  try {
                    const userData = { ...formState, role: "user" };
                    const user = await login(userData).unwrap();
                    dispatch(setCredentials(user));
                    navigate("/");
                  } catch (err) {
                    console.log(err);
                    toast({
                      status: "error",
                      title: "Error",
                      description: "Oh no, there was an error!",
                      isClosable: true,
                    });
                  }
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
