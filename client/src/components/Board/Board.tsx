import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { post, get } from "../../config/httpClient";
import List from "../List/List";
import { IList } from "../../types/types";

interface BoardPropsComponentType {
  user: any;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Board = ({ user, loggedIn, setLoggedIn }: BoardPropsComponentType) => {
  const [addNameOpen, setAddNameOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [listsU, setListsU] = useState<IList[]>([]);

  const userId = user.user.id;

  const addListHandler = () => {
    setAddNameOpen(true);
  };

  useEffect(() => {
    const getLists = async () => {
      const userLists = await get(`/lists/${userId}`);
      const updatedLists = userLists.list[0].lists;
      setListsU(updatedLists);
    };
    getLists();
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      title: listName,
      userId: userId,
    };

    const response = await post("/lists", data);
    const result = await response.json();
    if (result.message === "success") {
      setAddNameOpen(false);
      const userLists = await get(`/lists/${userId}`);
      const updatedLists = userLists.list[0].lists;
      setListsU(updatedLists);
    }
  };

  const handleChange = async (e: any) => {
    const { value } = e.target;
    setListName(value);
  };

  return (
    <Box>
      <Box>
        <Box
          rounded="lg"
          height="auto"
          width="272px"
          display="flex"
          flexDirection="column"
          mt="10px"
          mx="10px"
        >
          <Button
            onClick={addListHandler}
            size="xs"
            my="10px"
            mx="5px"
            backgroundColor="lighblue"
            color="black"
            loadingText="Adding list"
          >
            + Add a List
          </Button>
        </Box>
        {addNameOpen ? (
          <Box
            rounded="lg"
            height="auto"
            width="272px"
            display="flex"
            flexDirection="column"
            mt="10px"
            mx="10px"
          >
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                name="title"
                placeholder="Add list title"
                onChange={handleChange}
                value={listName}
                autoComplete="off"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={onSubmit}>
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        ) : null}
      </Box>
      <Flex
        flexDirection={["column", "row", "row", "row"]}
        flexWrap="wrap"
        justifyContent="flex-start"
      >
        {listsU &&
          listsU.map((list: IList, i: React.Key | null | undefined) => {
            return (
              <Box>
                <List
                  key={i}
                  list={list}
                  listsU={listsU}
                  setListsU={setListsU}
                  user={user}
                />
              </Box>
            );
          })}
      </Flex>
    </Box>
  );
};

export default Board;
