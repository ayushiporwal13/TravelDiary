import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Inputfield from "../components/inputfield";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const EditPost = ({ data }) => {
  const [travelPost, setTravelPost] = useState([]);
  const { id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const update = async () => {

    const { data, error } = await supabase
    .from('TravelDiary')
    .update({ 
      title: travelPost.title, 
      description: travelPost.description, 
      url: travelPost.url 
    })
    .eq('id',id)

    window.alert("Post Updated Successfully")
    window.location = '/';
  }

  return (
    <div>
      <h1> Update Post</h1>

      <Inputfield
        type="text"
        placeholder={data.title}
        handleChange={handleChange}
        title="Title"
        name="title"
        value={travelPost.title}
      />

      <Inputfield
        type="text"
        placeholder={travelPost.description}
        handleChange={handleChange}
        title="Enter Description"
        name="description"
        value={travelPost.description}
      />
      <Inputfield
        type="text"
        placeholder={travelPost.url}
        handleChange={handleChange}
        title="Enter URL"
        name="url"
        value={travelPost.url}
      />

      <Button variant="contained" color="success" onClick={update}>
        Update
      </Button>  
      {/* <Button variant="contained" color="error" >
            <DeleteIcon />
        </Button>     */}
    </div>
  );
};

export default EditPost;
