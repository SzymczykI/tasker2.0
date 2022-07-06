import {
  Box,
  Button,
  Flex,
  list,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { del, get, put } from "../../config/httpClient";
import { IList, ITasks } from "../../types/types";
import UpdateModal from "../UpdateModal/UpdateModal";

interface TaskPropsComponentType {
  list: IList;
  task: ITasks;
  taskList: ITasks[];
  setTaskList: React.Dispatch<React.SetStateAction<ITasks[]>>;
}

const colors = {
  green: "#bbe8a7",
  yellow: "#eef099",
  red: "#e09a92",
  blue: "#98e8eb",
  pink: "#ebbed8",
};

const Task = ({
  list,
  task,
  taskList,
  setTaskList,
}: TaskPropsComponentType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateTaskData, setUpdateTaskData] = useState({
    title: "",
    description: "",
    type: "",
    label: "",
  });

  const deleteTaskHandler = async (e: any) => {
    const id = task.id;
    e.preventDefault();
    const response = await del(`/tasks/task/${id}`);
    const result = await response.json();

    if (result.message === "Deleted successfully") {
      const updatedL = taskList.filter((i) => i.id !== id);
      setTaskList(updatedL);
    }
  };

  const updateTaskHandler = async (e: any) => {
    const id = task.id;
    const listId = list.id;
    e.preventDefault();

    const data = {
      title: updateTaskData.title,
      description: updateTaskData.description,
      type: updateTaskData.type,
      label: updateTaskData.label,
    };

    const response = await put(`/tasks/task/${id}`, data);
    const result = await response.json();
    if (result.message === "success") {
      const listTasks = await get(`/tasks/${listId}`);
      const updatedList = listTasks.task.tasks;
      setTaskList(updatedList);
    }
    onClose();
  };

  return (
    <Box
      w="240px"
      p="20px 20px"
      borderRadius="3px"
      bg="white"
      boxShadow="rgb(0 0 0 / 10%) 0 0 10px"
      m="2"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Flex justifyContent="flex-start" flexDirection="column">
        <Text fontSize="1rem">{task.title}</Text>
        <Text fontSize="0.8rem">{task.description}</Text>
      </Flex>
      <Box position="relative" left="105" top="-16">
        <Menu>
          <MenuButton aria-label="Options">
            <FiMoreHorizontal />
          </MenuButton>
          <MenuList justifyContent="center" alignItems="center">
            <MenuItem onClick={onOpen}>
              <AiOutlineEdit />
              <Text marginLeft="5px">Edit</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={deleteTaskHandler}>
              <AiOutlineDelete />
              <Text marginLeft="5px">Delete</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateModal
              task={task}
              updateTaskData={updateTaskData}
              setUpdateTaskData={setUpdateTaskData}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button colorScheme="blue" mr={3} onClick={updateTaskHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Task;
