import { Box, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { IList, ITask } from "../../types/types";

interface FormPropsComponentType {
    task: ITask;
    setUpdateTaskData : React.Dispatch<React.SetStateAction<ITask>>;
    updateTaskData: ITask
  }

const UpdateModal = ({ task, updateTaskData, setUpdateTaskData } : FormPropsComponentType ) => {
 
    

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setUpdateTaskData({
      ...updateTaskData,
      [name]: value,
    });
  };

  
  return (
    <>
      <Box>
        <Input
          type="text"
          name="title"
          value={updateTaskData.title}
          onChange={handleChange}
          required
          mb="3px"
          variant="outline"
          placeholder="title"
        />
        <Input
          type="text"
          name="description"
          value={updateTaskData.description}
          onChange={handleChange}
          variant="outline"
          placeholder="description"
        />
        <Select name="type" value={updateTaskData.type} onChange={handleChange} placeholder="type">
          <option value="daily">Daily</option>
          <option value="work-task">Work-task</option>
          <option value="food">Food</option>
        </Select>
        <Select name="label" value={updateTaskData.label} onChange={handleChange} placeholder="label">
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

export default UpdateModal;
