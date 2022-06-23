import React from "react";
import { Box, Image, Flex, Text } from "@chakra-ui/react";
import logo from "../../assets/tasker.png";

interface BoardPropsComponentType {
  user: string;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Board = ({
  user,
  loggedIn,
  setLoggedIn,
}: BoardPropsComponentType) => {

  return (
    <></>
  );
};

export default Board;
