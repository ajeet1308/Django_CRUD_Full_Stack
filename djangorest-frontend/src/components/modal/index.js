import { Fade, Modal, Box, Grid, Divider, Backdrop } from "@mui/material";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import FormGenPost from '../formGenPost'
import FormGenPut from '../formGenPut'

const CustomBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "15px",
}));

const Close = styled(CloseIcon)(() => ({
  cursor: "pointer",
  marginBottom: "5px",
}));

const H2 = styled.h2`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const ModalPrimary = (props) => {
  const { data, setData, open, setOpen, handleClose, heading, cellVal } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <CustomBox>
          <Grid display="flex" justifyContent="space-between">
            <H2>{heading}</H2>
            <Close onClick={handleClose} />
          </Grid>
          {heading === "Edit Articles" ? (
            <FormGenPut
              cellVal={cellVal}
              setOpen={setOpen}
              setData={setData}
              data={data}
            />
          ) : (
            <FormGenPost setOpen={setOpen} setData={setData} data={data} />
          )}
          <Divider />
        </CustomBox>
      </Fade>
    </Modal>
  );
};

export default ModalPrimary;
