import React, { useState } from "react";
import Inputfield from "../components/inputfield";
import { Button } from "@mui/material";
import { supabase } from '../client';

const CreatePost = () => {
  const [travelPost, setTravelPost] = useState({
    title: "",
    description: "",
    url: "",
    location: "",
    date: new Date(),
    comments: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTravelPost((prevValue) => {
        return {
            ...prevValue,
            [name]: value,
        }
    })
  };

  const createPost = async (event) => {
    event.preventDefault();

    const createdPost = {
        title: travelPost.title,
        description: travelPost.description,
        url: travelPost.url,
        location: travelPost.location,
        date: travelPost.date,
        comments: travelPost.comments,
    }

    console.log('createdPost', createdPost);
    const { error } = await supabase
    .from('TravelDiary')
    .insert(createdPost)
    .select()

    if (error) {
        alert(error.message)
    }

    window.location = '/';
  }

  return (
    <div className="createPost">
      <h1> Share your travel experience</h1>
      <Inputfield
        type="text"
        placeholder="Enter title"
        handleChange={handleChange}
        title="Enter Title"
        name='title'
      />
      <Inputfield
        type="textarea"
        placeholder="Enter description"
        handleChange={handleChange}
        title="Enter Description"
        name='description'
      />
      <Inputfield
        type="text"
        placeholder="Enter image url"
        handleChange={handleChange}
        title="Enter Image URL"
        name='url'
      />
      <Inputfield
        type="text"
        placeholder="Enter location"
        handleChange={handleChange}
        title='Enter Location'
        name='location'
      />
      <Inputfield
        type="date"
        placeholder="mm/dd/yyyy"
        handleChange={handleChange}
        title='Enter Date'
        name='date'
      />
      <Button variant="contained" color="primary" type='submit' onClick={createPost}>
        Create Post
      </Button>
    </div>
  );
};

export default CreatePost;
