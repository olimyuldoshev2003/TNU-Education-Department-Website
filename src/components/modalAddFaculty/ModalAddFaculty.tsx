import React, { Dispatch, SetStateAction, useState } from "react";
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
  const [imgAddFaculty, setImgAddFaculty] = useState<any>(null);

  function handChangeImgAddFaculty(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImgAddFaculty(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

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
          <div className="block_modal_add_faculty px-2">
            <form action="" className="form_modal_add_faculty">
              <DialogTitle>{"Add Faculty"}</DialogTitle>
              <div className="block_inputs_add_faculty">
                <div className="block_1_img_and_img_input space-y-2">
                  <img
                    src={
                      imgAddFaculty
                        ? imgAddFaculty
                        : `https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=`
                    }
                    alt=""
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={handChangeImgAddFaculty}
                    className="w-[235px]"
                  />
                </div>
                <div className="block_input_faculty_name_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyName">
                    Name of faculty <span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyName"
                    placeholder="Enter the name of faculty"
                  />
                </div>
                <div className="block_input_faculty_about_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyAbout">
                    About this faculty <span className="text-[red]">*</span>
                  </label>
                  <textarea
                    name=""
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px] h-[200px]"
                    id="facultyAbout"
                    placeholder="Enter about this faculty"
                  />
                </div>
                <div className="block_input_faculty_opened_year_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyOpenedYear">
                    Opened year of this faculty{" "}
                    <span className="text-[red]">*</span>
                  </label>

                  <input
                    type="number"
                    name=""
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyOpenedYear"
                    placeholder="Enter the opening year (YYYY)"
                    min="1000"
                    max={new Date().getFullYear()}
                    required
                    onInput={(e) => {
                      const input = e.currentTarget;
                      if (input.value.length > 4) {
                        input.value = input.value.slice(0, 4);
                      }

                      // Set custom validation message
                      if (input.value.length !== 4) {
                        input.setCustomValidity(
                          "Please enter exactly 4 digits"
                        );
                      } else {
                        input.setCustomValidity("");
                      }
                    }}
                  />
                </div>
                <div className="block_input_faculty_dean_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyDean">
                    Dean of faculty <span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyDean"
                    placeholder="Enter the dean of faculty"
                  />
                </div>
                <div className="block_input_faculty_opened_year_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyValueStudents">
                    The value of students <span className="text-[red]">*</span>
                  </label>

                  <input
                    type="number"
                    name=""
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyValueStudents"
                    placeholder="Enter the value of students"
                    required
                  />
                </div>
              </div>
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
                <Button variant="contained" fullWidth type="submit">
                  Add
                </Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAddFaculty;
