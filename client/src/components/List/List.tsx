import {
  Box,
  Text,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  MenuButton,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "./List.css";
import { IList } from "../../types/types";
import { del } from "../../config/httpClient";
import Form from "../Form/Form";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";

interface ListPropsComponentType {
  list: IList;
  listsU: IList[];
  setListsU: React.Dispatch<React.SetStateAction<IList[]>>;
}

const List = ({ list, listsU, setListsU }: ListPropsComponentType) => {
  const [task, setTask] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addTaskHandler = () => {
    setTask("done");
  };

  const deleteListHandler = async (e: any) => {
    const id = list.id;
    e.preventDefault();
    const response = await del(`/lists/list/${id}`);
    const result = await response.json();

    if (result.message === "Deleted successfully") {
      const updatedL = listsU.filter((i) => i.id !== id);
      setListsU(updatedL);
    }
  };

  return (
    <Box
      w="250px"
      p="20px 20px"
      borderRadius="3px"
      bg="white"
      boxShadow="rgb(0 0 0 / 10%) 0 0 10px"
      m="3"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex display="flex" flexDirection="row" justifyContent="center">
        <Box position="relative" left="105">
          <Menu>
            <MenuButton aria-label="Options">
              <FiMoreHorizontal />
            </MenuButton>
            <MenuList justifyContent="center" alignItems="center">
              <MenuItem>
                <AiOutlineEdit />
                <Text marginLeft="5px">Edit</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={deleteListHandler}>
                <AiOutlineDelete />
                <Text marginLeft="5px">Delete</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box
          textAlign="center"
          color="#5E6C84"
          mt="5"
          mb="5"
          fontSize={["10px", "10px", "15px", "15px"]}
          fontWeight="semibold"
          lineHeight="normal"
        >
          <Text fontWeight="bold" fontSize="20px">
            {list.title}
          </Text>
        </Box>
      </Flex>
      <Box
        rounded="lg"
        height="auto"
        width="250px"
        display="flex"
        flexDirection="column"
        mt="10px"
        mx="1px"
      >
        <Button
          onClick={onOpen}
          my="1px"
          mx="1px"
          backgroundColor="lighblue"
          color="black"
          loadingText="Adding task"
        >
          + Add a task
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default List;
