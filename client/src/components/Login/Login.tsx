import React from "react";
import {
  Flex,
  Box,
  FormControl,
  Input,
  Button,
  Image,
  Link,
  Text,
  Alert,
  AlertDescription,
  CloseButton,
  AlertTitle,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../config/config";
import { useNavigate } from "react-router-dom";
import { post } from "../../config/httpClient";

interface LoginPropsComponentType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({
  user,
  setUser,
  loggedIn,
  setLoggedIn,
}: LoginPropsComponentType) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setErrorState] = useState(false);

  const loginUser = async (e: any) => {
    e.preventDefault();
    setIsFetching(true);

    console.log(user);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await post("/auth/login", data);
    const result = await response.json();

    setIsFetching(false);

    if (response.status === 404) {
      setErrorState(true);
    }
    if (result.message === "success") {
      setUser(result);
      navigate("/board");
    }
  };

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showLoginError = () => {
    if (!hasError) return;

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
        <AlertDescription>Invalid username or password</AlertDescription>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => setErrorState(!hasError)}
        />
      </Alert>
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" my="40px">
        <Text fontWeight="bold" fontSize="28px" m="4px">
          Tasker
        </Text>
      </Box>

      <Flex
        alignItems="center"
        flexDirection={["column", "column", "row", "row"]}
        justifyContent="center"
      >
        <Box
          p="25px 40px"
          width={["80%", "60%", "45%", "25%"]}
          borderRadius="3px"
          bg="white"
          boxShadow="rgb(0 0 0 / 10%) 0 0 10px"
        >
          <Box
            textAlign="center"
            color="#5E6C84"
            mt="5"
            mb="25"
            fontSize={["16px", "16px", "20px", "20px"]}
            fontWeight="semibold"
            lineHeight="normal"
          >
            <h1>Log in to Tasker</h1>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Enter Email "
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl mt={6}>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Enter Password"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                width="full"
                mt={4}
                bg="success"
                color="white"
                onClick={loginUser}
                isLoading={isFetching}
                loadingText="Logging"
              >
                Sign In
              </Button>
              <Box m="5" textAlign="center">
                <Link href="/signup" color="brand" p="2">
                  Sign up for an account
                </Link>
              </Box>
              {showLoginError()}
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
