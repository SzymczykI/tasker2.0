import {
  Box,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Form = () => {

    const [values, setValues] = useState({
        title: "",
        description: "",
        type: ""
    });

    const handleChange = async (e: any) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

    // const onSubmit = async (e: any) => {
    //     e.preventDefault();
    
    //     const data = {
          
    //     };
    
    //     const response = await post("/lists", data);
    //     const result = await response.json();
    //     if (result.message === "success") {
    //       setAddNameOpen(false);
    //       const userLists = await get(`/lists/${userId}`);
    //       const updatedLists = userLists.list[0].lists;
    //       setListsU(updatedLists);
    //     }
    //   };

  return (
    <>
      <Box>
        <Input value={values.title} onChange={handleChange} required mb="3px" variant="outline" placeholder="title" />
        <Input value={values.description} onChange={handleChange} variant="outline" placeholder="description" />
        <Select onChange={handleChange} placeholder="Type">
          <option value={values.type}>Daily</option>
          <option value={values.type}>Work-task</option>
          <option value={values.type}>Food</option>
        </Select>
      </Box>
    </>
  );
};

export default Form;
