import {
   Button,
  Center,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedComponent } from "../components/ui/auth/ProtectedComponent";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../hooks/hook";
import { LoginRequest, useLoginMutation } from "../redux/features/auth/auth";

function PasswordInput({
  name,
  onChange,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        name={name}
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [formState, setFormState] = React.useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  return (
    <Center h="500px">
      <VStack spacing="4">
        <InputGroup>
          <Input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Email"
          />
        </InputGroup>

        <InputGroup>
          <PasswordInput onChange={handleChange} name="password" />
        </InputGroup>
        <Button
          // isFullWidth
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
          colorScheme="green"
          isLoading={isLoading}
        >
          Login
        </Button>
        <Divider />
        <ProtectedComponent />
      </VStack>
    </Center>
  );
}
