import React from "react";
import { Button, Image, Flex, Box, Spacer } from "@chakra-ui/react";
import { GrLogout } from "react-icons/gr";
import logo from "../../assets/tasker.png";
import { useNavigate } from "react-router-dom";

interface NavPropsComponentType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({
  user,
  setUser,
  loggedIn,
  setLoggedIn,
}: NavPropsComponentType) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
      setUser('');
      setLoggedIn(false);
      navigate("/");
  }

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const renderButtons = () => {
    if (user !== "") {
      return (
        <Button
          fontSize="20"
          color="danger"
          variant="link"
          float="right"
          mr="2"
          pr="2"
          onClick={logoutHandler}
        >
          <GrLogout />
        </Button>
      );
    }

    return (
      <>
        <Button
          fontSize="20"
          color="brand"
          variant="link"
          float="right"
          mr="2"
          pr="2"
          onClick={navigateToLogin}
        >
          Log in
        </Button>
        <Button
          fontSize="md"
          colorScheme="blue"
          color="white"
          m="4"
          onClick={navigateToSignUp}
        >
          Sign up
        </Button>
      </>
    );
  };

  return (
    <Box  boxShadow="md">
      <Flex>
        <Image height="8" src={logo} alt="brand logo" m="5"></Image>
        <Spacer />
        {renderButtons()}
      </Flex>
    </Box>
  );
};

export default Nav;
