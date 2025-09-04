import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  // Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalAddFaculty = ({
  modalAddFaculty,
  setModalAddFaculty,
}: {
  modalAddFaculty: boolean;
  setModalAddFaculty: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="modal_add_faculty_component">
        <Dialog
          open={modalAddFaculty}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setModalAddFaculty(false);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add Faculty"}</DialogTitle>

          <DialogActions
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setModalAddFaculty(false);
              }}
            >
              Close
            </Button>
            <Button variant="contained" fullWidth>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAddFaculty;
