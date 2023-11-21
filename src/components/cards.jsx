/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// import { supabase } from "../src/client";
import { useState } from "react";
import { supabase } from "../client";

export default function Cards(props) {
  // const [travelPost, setTravelPost] = useState({
  //   title: "",
  //   description: "",
  //   url: "",
  //   location: "",
  //   date: "",
  //   comments: [],
  // });

  // const updatePost = async (event) => {
  //   const { data } = await supabase
  //   .from('TravelDiary')
  //   .update({count:count})
  //   .eq("id", id);
  // }
  const hoursAgo = Math.floor(
    (new Date() - new Date(props.created_at)) / (1000 * 60 * 60)
  );
  const timeAgo =
    hoursAgo >= 24
      ? `${Math.floor(hoursAgo / 24)} days ago`
      : `${hoursAgo} hours ago`;

  return (
    <Card sx={{ minWidth: 275 }}>
      <Link to={"/post/" + props.id}>
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            Posted {timeAgo}
          </Typography>
          <Typography variant="h5" color="text.primary">
            {props.title}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {props.upvotes} upvotes
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Link to={"/edit/" + props.id}>
          <Button size="large" style={{ color: "black" }}>
            <EditIcon />
          </Button>
        </Link> */}

          {/*         
          <Button size="large" style={{ color: "white", background:"#1976d2"}}>
            Read More
          </Button> */}
        </CardActions>
      </Link>
    </Card>
  );
}
