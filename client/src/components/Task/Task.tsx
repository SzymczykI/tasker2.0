import { Box, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { del } from "../../config/httpClient";
import { ITasks } from "../../types/types";

interface TaskPropsComponentType {
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
}

const Task = ({ task, taskList, setTaskList }: TaskPropsComponentType) => {

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
      <Flex
      justifyContent="flex-start"
      flexDirection="column">
      <Text
        fontSize="1rem"
      >
       {task.title}
      </Text>
      <Text
        fontSize="0.8rem"
      >
       {task.description}
      </Text>
      </Flex>
      <Box position="relative" left="105" top="-16">
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
              <MenuItem onClick={deleteTaskHandler}>
                <AiOutlineDelete />
                <Text marginLeft="5px">Delete</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
    </Box>
  );
};

export default Task;
