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
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IList, ITasks } from "../../types/types";
import { del, get, post, put } from "../../config/httpClient";
import Form from "../Form/Form";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Task from "../Task/Task";
import { X } from "react-feather";

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
  const [listTitle, setListTitle] = useState("");
  const [changeTitleOpen, setChangeTitleOpen] = useState(false);

  const listId = list.id;
  const userId = user.user.id;

  useEffect(() => {
    const getLists = async () => {
      const listTasks = await get(`/tasks/${listId}`);
      const updatedList = listTasks.task.tasks;
      setTaskList(updatedList);
    };
    getLists();
  }, [listsU]);

  const addTaskHandler = async (e: any) => {
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
      setTaskValues({
        title: "",
        description: "",
        type: "",
        label: "",
      });
    }
    onClose();
  };

  const deleteListHandler = async (e: any) => {
    const id = list.id;
    e.preventDefault();
    const response = await del(`/lists/list/${id}`);
    const result = await response.json();

    if (result.message === "Deleted successfully") {
      const userLists = await get(`/lists/${userId}`);
      const updatedLists = userLists.list[0].lists;
      setListsU(updatedLists);
    }
  };

  const updateListHandler = async (e: any) => {
    const id = list.id;
    e.preventDefault();

    const data = {
      title: listTitle,
    };

    const response = await put(`/lists/list/${id}`, data);
    const result = await response.json();
    if (result.message === "success") {
      setChangeTitleOpen(!changeTitleOpen);
      const userLists = await get(`/lists/${userId}`);
      const updatedLists = userLists.list[0].lists;
      setListsU(updatedLists);
      setListTitle("");
    }
  };

  const handleChange = async (e: any) => {
    const { value } = e.target;
    setListTitle(value);
  };

  return (
    <Box
      w="250px"
      borderRadius="3px"
      bg="#d8e8f2"
      boxShadow="rgb(0 0 0 / 10%) 0 0 10px"
      m="3"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      // alignItems="center"
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <Box
          color="#134d70"
          mt="2"
          mb="2"
          pl="2rem"
          pt="2rem"
          fontSize="20px"
          fontWeight="semibold"
          lineHeight="normal"
        >
          <Text>{list.title}</Text>
        </Box>
        <Box p="1rem">
          <Menu>
            <MenuButton aria-label="Options">
              <FiMoreHorizontal />
            </MenuButton>
            <MenuList justifyContent="center" alignItems="center">
              <MenuItem onClick={() => setChangeTitleOpen(!changeTitleOpen)}>
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
      </Flex>
      {changeTitleOpen ? (
        <Box
          rounded="lg"
          height="auto"
          width="230px"
          display="flex"
          flexDirection="column"
          mt="10px"
          ml="1rem"
          // mx="10px"
        >
          <InputGroup size="md">
            <Input
              // ml="1rem"
              mr="1rem"
              type="text"
              name="title"
              placeholder="Change list title"
              onChange={handleChange}
              value={listTitle}
              autoComplete="off"
              width="250px"
              autoFocus
            />
            <InputRightElement width="4.5rem">
              <Button
                mr="1.2rem"
                h="1.75rem"
                size="sm"
                onClick={updateListHandler}
              >
                Update
              </Button>
              <X
                onClick={() => setChangeTitleOpen(!changeTitleOpen)}
                className="closeIcon"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form
              list={list}
              taskValues={taskValues}
              setTaskValues={setTaskValues}
            />
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
      <Flex flexDirection="column" justifyContent="center">
        <Box m="5px">
          {taskList &&
            taskList.map((task: ITasks, i: React.Key | null | undefined) => {
              return (
                <Task
                  key={i}
                  task={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  list={list}
                />
              );
            })}
        </Box>
      </Flex>
      <Box
        rounded="lg"
        height="auto"
        width="240px"
        display="flex"
        flexDirection="column"
        my="0.5rem"
        mx="2px"
      >
        <Button
          onClick={onOpen}
          backgroundColor="rgb(223 227 230 / 55%)"
          borderRadius="10"
          boxShadow="1px 1px 0 1px rgba(0, 0, 0, 0.12)"
          color="black"
          loadingText="Adding task"
        >
          + Add task
        </Button>
      </Box>
    </Box>
  );
};

export default List;
