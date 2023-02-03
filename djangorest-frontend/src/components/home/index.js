/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { Services } from "../../services";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import ModalPrimary from "../../components/modal";

const Customdiv = styled.div`
  height: 400px;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Home = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertShow, setAlertShow] = useState({ open: false, msg: "" });
  const [cellVal, setCellVal] = useState();
  const [heading, setHeading] = useState();

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
        ).then((response) => setData(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    getAllPublishedArticle();
  }, []);

  return (
    <div>
      <h1>Below are all your published articles</h1>{" "}
      <Button
        variant="contained"
        onClick={() => {
          setHeading("Add a new Article");
          setOpen(true);
        }}
      >
        Add Articles
      </Button>
      <br/><br/>
      <Button variant="contained" onClick={deleteAllHandler}>
        Delete all Articles
      </Button>
      {data.length > 0 ? (
        <Customdiv>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </Customdiv>
      ) : <h1>No Data Here!</h1>}
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
