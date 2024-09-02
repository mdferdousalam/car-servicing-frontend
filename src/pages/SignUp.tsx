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
  Stack,
  Link,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { FaLock, FaUserAlt, FaPhoneAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hook";
import {
  Roles,
  SignUpRequest,
  useSignUpMutation,
} from "../redux/features/auth/auth";
import { setCredentials } from "../redux/features/auth/authSlice";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [formState, setFormState] = React.useState<SignUpRequest>({
    username: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    role: Roles.USER,
    email: "",
    password: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const [signup, { isLoading }] = useSignUpMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = {
        username: {
          firstName: formState.firstName,
          middleName: formState.middleName,
          lastName: formState.lastName,
        },
        email: formState.email,
        password: formState.password,
        role: "user", // default role
        phone: formState.phone,
        address: {
          street: formState.street,
          city: formState.city,
          state: formState.state,
          postalCode: formState.postalCode,
          country: formState.country,
        },
      };
      const user = await signup(userData).unwrap();
      dispatch(setCredentials(user));
      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        status: "error",
        title: "Error",
        description: "There was an error during signup!",
        isClosable: true,
      });
    }
  };

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
        <Heading color="teal.400">Sign Up</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
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
                    type="text"
                    placeholder="First Name"
                    onChange={handleChange}
                    name="firstName"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Middle Name (optional)"
                  onChange={handleChange}
                  name="middleName"
                  bg="white"
                  borderColor="gray.300"
                  _focus={{ borderColor: "teal.500" }}
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChange}
                    name="lastName"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    name="email"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
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
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaPhoneAlt color="gray.300" />}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    name="phone"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaHome color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Street"
                    onChange={handleChange}
                    name="street"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="City"
                    onChange={handleChange}
                    name="city"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="State"
                    onChange={handleChange}
                    name="state"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    onChange={handleChange}
                    name="postalCode"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Country"
                    onChange={handleChange}
                    name="country"
                    bg="white"
                    borderColor="gray.300"
                    _focus={{ borderColor: "teal.500" }}
                    required
                  />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isLoading}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" href="/login">
          Login
        </Link>
      </Box>
    </Flex>
  );
}
