import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Inputfield from "../components/Inputfield";
import { useState } from "react";

const EditPost = ({ data }) => {
  const [travelPost, setTravelPost] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1> Update Post</h1>

      <Inputfield
        type="text"
        placeholder={data.title}
        handleChange={handleChange}
        title="Enter Title"
        name="Title"
        value={data.title}
      />

      <Inputfield
        type="text"
        placeholder={data.description}
        handleChange={handleChange}
        title="Enter Description"
        name="Description"
        value={data.description}
      />
      <Inputfield
        type="text"
        placeholder={data.url}
        handleChange={handleChange}
        title="Enter URL"
        name="Image URL"
        value={data.url}
      />
      {/* <Button variant="contained" color="error" >
            <DeleteIcon />
        </Button>     */}
    </div>
  );
};

export default EditPost;
