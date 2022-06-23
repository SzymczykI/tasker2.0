import React from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import logo from "../../assets/tasker.png";

interface WelcomePagePropsComponentType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const WelcomePage = ({
  user,
  setUser,
  loggedIn,
  setLoggedIn,
}: WelcomePagePropsComponentType) => {

  return (
    <>
      <Box bgGradient="linear(darkblue, white)" height="100vh">
        <Flex
          alignItems="center"
          flexDirection={["column", "column", "row", "row"]}
          justifyContent="center"
          p="4rem"
        >
          <Box>
            <Image src={logo} alt="logo"></Image>
          </Box>
          <Box>
            <Text
              fontSize={["40px", "40px", "50px", "50px"]}
              fontWeight="bold"
              lineHeight="50px"
            >
              Multi-Tasker.
            </Text>
            <Text
              fontSize={["1rem", "1rem", "1.5rem", "1.5rem"]}
              width={["100%", "100%", "50%", "50%"]}
            >
              Collaborate, manage projects, and reach new productivity peaks.
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default WelcomePage;
