import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Services } from "../../services";

const FormGenPut = (props) => {
  const { cellVal, setOpen, setData, data } = props;
  const [tempData, setTempData] = useState({
    title: cellVal?.row?.title,
    description: cellVal?.row?.description,
  });
  const handleSubmit = async () => {
    console.log(data);
    try {
      const url =
        process.env.REACT_APP_PUT_UPDATE_ARTICLE_BY_ID + "/" + cellVal?.row?.id;
      await Services.put(url, tempData).then((response) => {
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
        Save
      </Button>
    </div>
  );
};

export default FormGenPut;
