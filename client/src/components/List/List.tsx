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
import React, { useState, useEffect } from "react";
import { IList, ITasks } from "../../types/types";
import { del, get, post } from "../../config/httpClient";
import Form from "../Form/Form";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Task from "../Task/Task";

interface ListPropsComponentType {
  user: any;
  list: IList;
  listsU: IList[];
  setListsU: React.Dispatch<React.SetStateAction<IList[]>>;
}

const List = ({ list, listsU, setListsU, user }: ListPropsComponentType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskValues, setTaskValues] = useState({
    title: "",
    description: "",
    type: "",
    label: "",
  });
  const [taskList, setTaskList] = useState<ITasks[]>([]);

  const listId = list.id;
  const userId = user.user.id;

  useEffect(() => {
    const getLists = async () => {
      const listTasks = await get(`/tasks/${listId}`);
      const updatedList = listTasks.task.tasks;
      setTaskList(updatedList);
    };
    getLists();
  }, []);

  const addTaskHandler = async (e:any) => {
    e.preventDefault();

    const data = {
      userId: userId,
      listId: listId,
      title: taskValues.title,
      description: taskValues.description,
      type: taskValues.type,
      label: taskValues.label,
    };

    const response = await post("/tasks", data);
    const result = await response.json();

    if (result.message === "success") {
      const listTasks = await get(`/tasks/${listId}`);
      const updatedList = listTasks.task.tasks;
      setTaskList(updatedList);
    }
    onClose();
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
        <Box position="relative" left="150" top="-4">
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
            <Form list={list} taskValues={taskValues} setTaskValues={setTaskValues} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button colorScheme="blue" mr={3} onClick={addTaskHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
      >
        {taskList &&
          taskList.map((task: ITasks, i: React.Key | null | undefined) => {
            return (
              <Box>
                <Task
                  key={i}
                  task={task}
                  taskList={taskList}
                  setTaskList={setTaskList}

                />
              </Box>
            );
          })}
      </Flex>
    </Box>
  );
};

export default List;



