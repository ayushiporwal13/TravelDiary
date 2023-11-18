import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
import { Button , Box, TextField } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

const DetailPage = ({ data }) => {
  const { id } = useParams();
  const [count, setCount] = useState(
    data[id] === undefined ? 0 : data[id].upvotes
  );
  const [travelPost, setTravelPost] = useState([]);
  const [newComment, setNewComment] = useState(""); // new comment input

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("TravelDiary").select().eq("id", id);

      if (data) {
        console.log(data);
        setTravelPost(data);
        setCount(data[0]?.upvotes || 0); // Set the upvotes count based on the first item in the data array
      }
    };

    fetchPost();
  }, [id]);

  const upVote = async () => {
    setCount((count) => count + 1);
    console.log("count", count);
    const { data } = await supabase
      .from("TravelDiary")
      .update({ upvotes: count + 1 })
      .eq("id", id);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("TravleDiary")
      .update({ comments: newComment })
      .eq("id", id);

    if (error) {
      console.error("Error adding comment: ", error);
    } else {
      setTravelPost((prevState) => ({
        ...prevState,
        comments: [...prevState.comments, data[0]],
      }));
      setNewComment("");
    }
  };

  const deletePost = async () => {
    const { data, error } = await supabase
      .from("TravelDiary")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting post: ", error);
    } else {
      window.location = "/";
    }
  }

  console.log("count outside", count);
  return (
    <>
      {travelPost &&
        travelPost.map((data) => (
          <div>
            <h1>{data.title}</h1>
            <h4>{data.description}</h4>
            <img
              src={data.url}
              alt={data.title}
              style={{ maxWidth: "700px" }}
            />
            <h4>{data.location}</h4>
            <h4>{data.date}</h4>
            <h4>{data.comments}</h4>
            <Box component="form" onSubmit={handleCommentSubmit}>
              <TextField
                label="New Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </Box>
            {travelPost.comments &&
              travelPost.comments.map((comment, index) => (
                <p key={index}>{comment.text}</p>
              ))}
          </div>
        ))}

      <Button className="upvote" onClick={upVote}>
        <div>{count}</div>
        <ThumbUpIcon />
      </Button>
      <Link to={"/edit/" + id}>
      <Button><EditIcon /></Button>
      </Link>
      <Button onClick={deletePost}><DeleteIcon /></Button>
    </>
  );
};

export default DetailPage;
