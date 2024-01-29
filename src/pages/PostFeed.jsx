import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import Cards from "../components/cards";
import { Grid, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const PostFeed = (data) => {
  const [travelPost, setTravelPost] = useState([]);
  const [sortType, setSortType] = useState("created_at"); // default sort type
  const [searchTerm, setSearchTerm] = useState(""); // search term
  const [isLoading, setIsLoading] = useState(false); // loading state

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      let { data } = await supabase
        .from("TravelDiary")
        .select()
        .order(sortType, { ascending: false });

      if (searchTerm) {
        data = data.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (data) {
        console.log(data);
      }

      setTravelPost(data);
      setIsLoading(false);
    };

    fetchPost();
  }, [sortType, searchTerm]); // re-run the effect when sortType or searchTerm changes

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setSortType("created_at")}>
          Sort by Created Time
        </Button>
        <Button onClick={() => setSortType("upvotes")}>Sort by Upvotes</Button>
      </div>
      <Grid container spacing={2} columns={16}>
        <h1 style={{ width: "100%" }}>Travel Experience</h1>
        {travelPost &&
          travelPost.map((data) => (
            <Grid item flexGrow={1}>
              <Cards
                id={data.id}
                title={data.title}
                created_at={data.created_at}
                description={data.description}
                upvotes={data.upvotes}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default PostFeed;
