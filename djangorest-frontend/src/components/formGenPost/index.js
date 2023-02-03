import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Services } from "../../services";

const FormGenPost = (props) => {
  const { setOpen, setData, data } = props;
  const [tempData, setTempData] = useState({
    title: '',
    description: '',
  });
  const handleSubmit = async () => {
    try {
      const url =
        process.env.REACT_APP_POST_ARTICLE;
      await Services.post(url, tempData).then((response) => {
        console.log(response);
        setData(response.data);
      });
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };
  return (
    <div>
      <TextField
        sx={{ width: "90%", margin: "20px" }}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={tempData?.title}
        onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
      />
      <TextField
        sx={{ width: "90%", margin: "20px" }}
        id="outlined-basic"
        label="Title Description"
        variant="outlined"
        value={tempData?.description}
        onChange={(e) =>
          setTempData({ ...tempData, description: e.target.value })
        }
      />
      <Button
        sx={{ height: "40px", marginLeft: "45%", marginBottom: "20px" }}
        variant="contained"
        onClick={handleSubmit}
      >
        Post
      </Button>
    </div>
  );
};

export default FormGenPost;
