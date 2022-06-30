import { Box, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { IList, ITask } from "../../types/types";

interface FormPropsComponentType {
    list: IList;
    setTaskValues : React.Dispatch<React.SetStateAction<ITask>>;
    taskValues: ITask
  }

const Form = ({ list, setTaskValues, taskValues } : FormPropsComponentType ) => {
 

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setTaskValues({
      ...taskValues,
      [name]: value,
    });
  };

  
  return (
    <>
      <Box>
        <Input
          type="text"
          name="title"
          value={taskValues.title}
          onChange={handleChange}
          required
          mb="3px"
          variant="outline"
          placeholder="title"
        />
        <Input
          type="text"
          name="description"
          value={taskValues.description}
          onChange={handleChange}
          variant="outline"
          placeholder="description"
        />
        <Select name="type" value={taskValues.type} onChange={handleChange} placeholder="type">
          <option value="daily">Daily</option>
          <option value="work-task">Work-task</option>
          <option value="food">Food</option>
        </Select>
        <Select name="label" value={taskValues.label} onChange={handleChange} placeholder="label">
          <option value="green">green</option>
          <option value="yellow">yellow</option>
          <option value="pink">pink</option>
          <option value="blue">blue</option>
          <option value="red">red</option>
        </Select>
      </Box>
    </>
  );
};

export default Form;
