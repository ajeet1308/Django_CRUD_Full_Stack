/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { Services } from "../../services";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import ModalPrimary from "../modal";


const Customdiv = styled.div`
  height: 400px;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WrapperRow = styled.div`
  display:flex;
  z-index:2;
  justify-content:space-between;
  height: 80px;
  padding-left: 80px;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #ffffff;
  margin-bottom: 50px;
  box-shadow: 0 2px 10px -1px rgba(0, 0, 0, 0.1);
`;

const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertShow, setAlertShow] = useState({ open: false, msg: "" });
  const [cellVal, setCellVal] = useState();
  const [heading, setHeading] = useState();
  const [searchData, setSearchData] = useState()
  const [loader,setLoader] = useState(false)

  console.log(searchData)
  const deleteHandler = async (cellValues) => {
    if (confirm("Do you want to delete this data?")) {
      const url =
        process.env.REACT_APP_DELETE_ARTICLE_BY_ID + "/" + cellValues?.row?.id;
      try {
        await Services.delete(url).then((response) => setData(response.data));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteAllHandler = async () => {
    if (confirm("Do you really want to delete whole data?")) {
      const url = process.env.REACT_APP_DELETE_ALL_ARTICLE;
      try {
        await Services.deleteAll(url).then((response) =>
          setData(response.data)
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearch = async () => {
    const url = process.env.REACT_APP_GET_ARTICLE_BY_TITLE + '?title=' + searchData;
    try {
      await Services.getByTitle(url).then((response) =>
        setData(response.data)
      )
    } catch (err) {
      console.log(err);
    }
  }

  const editHandler = (cellValues) => {
    setHeading("Edit Articles");
    setCellVal(cellValues);
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Title Description", width: 130 },
    { field: "published", headerName: "Published", width: 90 },
    {
      field: "action",
      headerName: "Actions",
      width: 130,
      renderCell: (cellValues) => (
        <>
          <Button>
            <DeleteIcon
              color="error"
              sx={{ marginRight: "20px" }}
              onClick={() => deleteHandler(cellValues)}
            />
          </Button>
          <Button>
            <EditIcon onClick={() => editHandler(cellValues)} />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const getAllPublishedArticle = async () => {
      try {
        await Services.get(
          process.env.REACT_APP_GET_ALL_PUBLISHED_ARTICLE
        ).then((response) => {setData(response.data); setLoader(false)});
      } catch (err) {
        console.log(err);
      }
    };
    getAllPublishedArticle();
  }, []);

  return (
    <div>
      <WrapperRow><h1>Published Articles</h1></WrapperRow>
      <Customdiv>
        <TextField
          sx={{ width: "70%", margin: "20px" }}
          id="outlined-basic"
          label="Please Enter the Title"
          variant="outlined"
          onChange={(e) =>
            setSearchData(e.target.value)
          }
        /> {' '}
        <Button sx={{margin:"30px"}} variant="contained" onClick={handleSearch}>Search</Button>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          loading={loader}
        />
        <Button
        variant="contained"
        sx={{marginTop:"20px", marginLeft:"150px"}}
        onClick={() => {
          setHeading("Add a new Article");
          setOpen(true);
        }}
      >
        Add Articles
      </Button> {' '}
      <Button sx={{marginTop: "20px", marginLeft:"100px"}} variant="contained" onClick={deleteAllHandler}>
        Delete all Articles
      </Button>
      </Customdiv>
      <ModalPrimary
        data={data}
        setData={setData}
        open={open}
        setOpen={setOpen}
        handleClose={() => setOpen(false)}
        heading={heading}
        cellVal={cellVal}
        alertShow={alertShow}
        setAlertShow={setAlertShow}
      />
    </div>
  );
};

export default Home;


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// // const bull = (
// //   <Box
// //     component="span"
// //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
// //   >
// //     •
// //   </Box>
// // );

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 , maxWidth:23 }}>
//       <Card variant="outlined">
//         <CardContent>
//           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//             Word of the Day
//           </Typography>
//           <Typography variant="h5" component="div">
//             daflakj
//           </Typography>
//           <Typography sx={{ mb: 1.5 }} color="text.secondary">
//             adjective
//           </Typography>
//           <Typography variant="body2">
//             well meaning and kindly.
//             <br />
//             {'"a benevolent smile"'}
//           </Typography>
//         </CardContent>
//         <CardActions>
//           <Button size="small">Learn More</Button>
//         </CardActions>
//       </Card>
//     </Box>
//   );
// }
