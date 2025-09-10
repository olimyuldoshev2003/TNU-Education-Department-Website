// ModalAddFaculty.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addFacultyAdmin } from "../../api/api";

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
  const dispatch = useAppDispatch();

  const [imgAddFaculty, setImgAddFaculty] = useState<any>(null);
  const [inpFacultyNameValue, setInpFacultyNameValue] = useState<string>("");
  const [inpFacultyAboutValue, setInpFacultyAboutValue] = useState<string>("");
  const [inpOpenedYearValue, setInpOpenedYearValue] = useState<string>("");
  const [inpFacultyDeanValue, setInpFacultyDeanValue] = useState<string>("");
  const [inpFacultyAmountStudentsValue, setInpFacultyAmountStudentsValue] =
    useState<string>("");
  const [imgAddingFromType, setImgAddingFromType] =
    useState<string>("internalImg");
  const [imgValidationError, setImgValidationError] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  // Function to validate image URL
  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;

      // Set a timeout to avoid hanging on invalid URLs
      setTimeout(() => {
        if (!img.complete) {
          resolve(false);
        }
      }, 5000);
    });
  };

  // Function to validate file type and size
  const validateFile = (file: File): boolean => {
    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      setImgValidationError(
        "Please select a valid image file (JPG, PNG, GIF, WEBP)"
      );
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setImgValidationError("Image size must be less than 5MB");
      return false;
    }

    return true;
  };

  // Function to handle external image URL input
  const handleExternalImageInput = async (url: string) => {
    if (!url.trim()) {
      setImgAddFaculty(null);
      setImgValidationError("Image URL is required");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      setImgValidationError("Please enter a valid URL");
      setImgAddFaculty(null);
      return;
    }

    // Check if URL points to an image
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const isImageUrl = imageExtensions.some((ext) =>
      url.toLowerCase().includes(ext)
    );

    if (!isImageUrl) {
      setImgValidationError(
        "URL must point to an image file (JPG, PNG, GIF, WEBP)"
      );
      setImgAddFaculty(null);
      return;
    }

    setIsImageLoading(true);

    // Check if the image exists and is accessible
    const isValid = await validateImageUrl(url);

    if (isValid) {
      setImgAddFaculty(url);
      setImgValidationError("");
    } else {
      setImgAddFaculty(null);
      setImgValidationError("Image not found or inaccessible");
    }

    setIsImageLoading(false);
  };

  function handChangeImgAddFaculty(event: any) {
    if (imgAddingFromType === "internalImg") {
      const file = event.target.files[0];

      if (!file) {
        setImgValidationError("Please select an image file");
        return;
      }

      if (!validateFile(file)) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (event: any) => {
        setImgAddFaculty(event.target.result);
        setImgValidationError("");
      };

      reader.onerror = () => {
        setImgValidationError("Failed to read the image file");
      };

      reader.readAsDataURL(file);
    } else {
      handleExternalImageInput(event.target.value);
    }
  }

  function handleChangeFacultyNameValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpFacultyNameValue(event.target.value);
  }
  function handleChangeFacultyAboutValue(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setInpFacultyAboutValue(event.target.value);
  }
  function handleChangeOpenedYearValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpOpenedYearValue(event.target.value);
  }
  function handleChangeFacultyDeanValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpFacultyDeanValue(event.target.value);
  }
  function handleChangeFacultyAmountStudentsValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpFacultyAmountStudentsValue(event.target.value);
  }

  function handleAddFaculty(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate all fields including image
    if (!imgAddFaculty) {
      setImgValidationError("Faculty image is required");
      return;
    }

    if (
      inpFacultyNameValue.trim().length === 0 ||
      inpFacultyAboutValue.trim().length === 0 ||
      inpOpenedYearValue.trim().length === 0 ||
      inpFacultyDeanValue.trim().length === 0 ||
      inpFacultyAmountStudentsValue.trim().length === 0
    ) {
      alert("Fill all required fields");
      return;
    }

    // Use fallback image if external URL is invalid
    const finalImage = imgAddFaculty;

    let newFaculty = {
      id: Date.now().toString(),
      facultyImg: finalImage,
      facultyName: inpFacultyNameValue,
      about: inpFacultyAboutValue,
      yearOfOpening: Number(inpOpenedYearValue),
      dean: inpFacultyDeanValue,
      students: Number(inpFacultyAmountStudentsValue),
    };

    dispatch(
      addFacultyAdmin({
        newFaculty: newFaculty,
      })
    );

    setModalAddFaculty(false);
    setImgAddFaculty(null);
    setInpFacultyNameValue("");
    setInpFacultyAboutValue("");
    setInpOpenedYearValue("");
    setInpFacultyDeanValue("");
    setInpFacultyAmountStudentsValue("");
    setImgValidationError("");
  }

  // Get the image source for preview
  const getImageSrc = () => {
    if (imgAddingFromType === "internalImg" && imgAddFaculty) {
      return imgAddFaculty;
    } else if (imgAddingFromType === "externalImg" && imgAddFaculty) {
      return imgAddFaculty;
    }
    return "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
  };

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
            <form
              action=""
              className="form_modal_add_faculty"
              onSubmit={handleAddFaculty}
            >
              <DialogTitle>{"Add Faculty"}</DialogTitle>
              <div className="block_inputs_add_faculty">
                <div className="block_1_img_and_img_input flex flex-col gap-3">
                  <div className="relative inline-block">
                    <img
                      src={getImageSrc()}
                      alt="Faculty preview"
                      className="w-[70px] h-[70px] rounded-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src =
                          "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
                      }}
                    />
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                        <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>

                  <select
                    name="imageSourceType"
                    className="cursor-pointer outline-none px-1 py-1 border-[1px] border-gray-500 rounded-[5px]"
                    value={imgAddingFromType}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      setImgAddingFromType(event.target.value);
                      setImgAddFaculty(null);
                      setImgValidationError("");
                    }}
                  >
                    <option value="internalImg">Upload image</option>
                    <option value="externalImg">External image URL</option>
                  </select>

                  {imgAddingFromType === "internalImg" ? (
                    <div className="flex flex-col gap-1">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        onChange={handChangeImgAddFaculty}
                        className="w-full cursor-pointer"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF, WEBP (Max 5MB)
                      </p>
                    </div>
                  ) : imgAddingFromType === "externalImg" ? (
                    <div className="flex flex-col gap-1">
                      <input
                        type="url"
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        onChange={handChangeImgAddFaculty}
                        className="w-full outline-none px-2 py-1 border-[1px] border-gray-500 rounded-[5px]"
                        required
                      />
                      {imgValidationError && (
                        <p className="text-red-500 text-xs">
                          {imgValidationError}
                        </p>
                      )}
                      {!imgValidationError && imgAddFaculty && (
                        <p className="text-green-500 text-xs">
                          Image URL is valid!
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="block_input_faculty_name_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyName" className="cursor-pointer">
                    Name of faculty <span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyName"
                    placeholder="Enter the name of faculty"
                    value={inpFacultyNameValue}
                    onChange={handleChangeFacultyNameValue}
                    required
                  />
                </div>

                <div className="block_input_faculty_about_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyAbout" className="cursor-pointer">
                    About this faculty <span className="text-[red]">*</span>
                  </label>
                  <textarea
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px] h-[200px]"
                    id="facultyAbout"
                    placeholder="Enter about this faculty"
                    value={inpFacultyAboutValue}
                    onChange={handleChangeFacultyAboutValue}
                    required
                  />
                </div>

                <div className="block_input_faculty_opened_year_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyOpenedYear" className="cursor-pointer">
                    Opened year of this faculty{" "}
                    <span className="text-[red]">*</span>
                  </label>
                  <input
                    type="number"
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
                    }}
                    value={inpOpenedYearValue}
                    onChange={handleChangeOpenedYearValue}
                  />
                </div>

                <div className="block_input_faculty_dean_modal_add mt-2 flex flex-col gap-1">
                  <label htmlFor="facultyDean" className="cursor-pointer">
                    Dean of faculty <span className="text-[red]">*</span>
                  </label>
                  <input
                    type="text"
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyDean"
                    placeholder="Enter the dean of faculty"
                    value={inpFacultyDeanValue}
                    onChange={handleChangeFacultyDeanValue}
                    required
                  />
                </div>

                <div className="block_input_faculty_amount_students_modal_add mt-2 flex flex-col gap-1">
                  <label
                    htmlFor="facultyAmountStudents"
                    className="cursor-pointer"
                  >
                    The amount of students <span className="text-[red]">*</span>
                  </label>
                  <input
                    type="number"
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyAmountStudents"
                    placeholder="Enter the amount of students"
                    required
                    min="0"
                    value={inpFacultyAmountStudentsValue}
                    onChange={handleChangeFacultyAmountStudentsValue}
                  />
                </div>
              </div>

              <DialogActions
                sx={{
                  display: "flex",
                  gap: 1,
                  padding: 2,
                }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setModalAddFaculty(false);
                    setImgValidationError("");
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={!!imgValidationError || isImageLoading}
                >
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
