import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link, useParams } from "react-router-dom";
import { Button , Box, TextField } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

const DetailPage = ({ data }) => {
  const { id } = useParams();
  const post = data.filter((post) => post.id == id);
  const [count, setCount] = useState(
    post[0] === undefined ? 0 : post[0].upvotes
  );
  const [travelPost, setTravelPost] = useState([]);
  const [comments, setComments] = useState([post[0].comments]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("TravelDiary").select().eq("id", id);

      if (data) {
        setTravelPost(data);
        setCount(data[0]?.upvotes || 0); // Set the upvotes count based on the first item in the data array
      }
    };

    fetchPost();
  }, [id]);

  const upVote = async () => {
    setCount((count) => count + 1);
    const { data } = await supabase
      .from("TravelDiary")
      .update({ upvotes: count + 1 })
      .eq("id", id);
  };

  const handleChange = (e) => {
    const newComment = e.target.value;
    setNewComment(newComment);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setComments((prev) => ([...prev, newComment]));
    const {data, error} = await supabase
    .from('TravelDiary')
    .update({ comments:comments})
    .eq('id', id)

    window.alert("Comment Added Successfully");
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
            <Box component="form" onSubmit={handleCommentSubmit}>
              <div>
              {travelPost &&
              travelPost.map((post, index) => (
                <div key={index}>{post.comments}</div>
              ))}
              </div>
              <TextField
                label="New Comment"
                value={newComment}
                onChange={(e) => handleChange(e)}
              />
              <Button type="submit">Submit</Button>
            </Box>
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
