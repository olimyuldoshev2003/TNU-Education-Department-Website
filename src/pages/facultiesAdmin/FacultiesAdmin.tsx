// FacultiesAdmin.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalAddFaculty from "../../components/modalAddFaculty/ModalAddFaculty";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TablePagination, TextareaAutosize, TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  getAndPaginateFacultiesAdmin,
  editFacultyAdmin,
  deleteFacultyAdmin,
} from "../../api/api";
import EachFacultyAdmin from "../../components/eachFacultyAdmin/eachFacultyAdmin";
import AddIcon from "@mui/icons-material/Add";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const FacultiesAdmin = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // States
  const [modalAddFaculty, setModalAddFaculty] = useState<boolean>(false);
  const [modalEditFaculty, setModalEditFaculty] = useState<boolean>(false);
  const [modalDeleteFaculty, setModalDeleteFaculty] = useState<boolean>(false);

  const [editingFacultyId, setEditingFacultyId] = useState<string>("");
  const [idxModalDeleteFaculty, setIdxModalDeleteFaculty] =
    useState<string>("");
  const [inpModalEditValue, setInpModalEditValue] = useState<any>({
    id: "",
    facultyImg: "",
    facultyName: "",
    about: "",
    yearOfOpening: "",
    dean: "",
    students: "",
  });

  const [imgAddingFromType, setImgAddingFromType] =
    useState<string>("internalImg");
  const [imgValidationError, setImgValidationError] = useState<string>("");
  const [externalImageUrl, setExternalImageUrl] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  // States from redux
  const { loadingFacultiesAdmin, facultiesAdmin } = useAppSelector(
    (state) => state.states
  );

  // Pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleCloseModalEditFaculty(): void {
    setModalEditFaculty(false);
    setEditingFacultyId("");
    setImgValidationError("");
    setExternalImageUrl("");
    setIsValidating(false);
    setSelectedFileName("");
    setIsImageLoading(false);
  }

  function handleCloseModalDeleteFaculty(): void {
    setModalDeleteFaculty(false);
  }

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
    setExternalImageUrl(url);
    setIsValidating(true);
    setIsImageLoading(true);

    if (!url.trim()) {
      setImgValidationError("Image URL is required");
      setIsValidating(false);
      setIsImageLoading(false);
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      setImgValidationError("Please enter a valid URL");
      setIsValidating(false);
      setIsImageLoading(false);
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
      setIsValidating(false);
      setIsImageLoading(false);
      return;
    }

    // Check if the image exists and is accessible
    const isValid = await validateImageUrl(url);

    if (isValid) {
      setInpModalEditValue({ ...inpModalEditValue, facultyImg: url });
      setImgValidationError("");
    } else {
      setImgValidationError("Image not found or inaccessible");
    }

    setIsValidating(false);
    setIsImageLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImgValidationError("Please select an image file");
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setInpModalEditValue({
        ...inpModalEditValue,
        facultyImg: e.target?.result as string,
      });
      setImgValidationError("");
      setExternalImageUrl("");
      setIsValidating(false);
      setSelectedFileName(file.name);
    };
    reader.onerror = () => {
      setImgValidationError("Failed to read the image file");
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "facultyImg" && imgAddingFromType === "externalImg") {
      setExternalImageUrl(value);
      // Validate immediately
      handleExternalImageInput(value);
    } else {
      setInpModalEditValue({ ...inpModalEditValue, [field]: value });
    }
  };

  const handleEditFaculty = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate image first
    if (!inpModalEditValue.facultyImg) {
      setImgValidationError("Faculty image is required");
      return;
    }

    if (
      !inpModalEditValue.facultyName.trim() ||
      !inpModalEditValue.about.trim() ||
      !inpModalEditValue.yearOfOpening ||
      !inpModalEditValue.dean.trim() ||
      !inpModalEditValue.students
    ) {
      alert("Please fill all required fields");
      return;
    }

    // If using external URL but validation failed, don't submit
    if (imgAddingFromType === "externalImg" && imgValidationError) {
      alert("Please fix the image URL validation error before submitting");
      return;
    }

    const updatedFaculty = {
      facultyImg: inpModalEditValue.facultyImg,
      facultyName: inpModalEditValue.facultyName,
      about: inpModalEditValue.about,
      yearOfOpening: Number(inpModalEditValue.yearOfOpening),
      dean: inpModalEditValue.dean,
      students: Number(inpModalEditValue.students),
    };

    dispatch(
      editFacultyAdmin({
        id: editingFacultyId,
        updatedFaculty: updatedFaculty,
      })
    );

    setModalEditFaculty(false);
    setEditingFacultyId("");
    setImgValidationError("");
    setExternalImageUrl("");
    setIsValidating(false);
    setSelectedFileName("");
    setIsImageLoading(false);
  };

  const getImageSrc = () => {
    return (
      inpModalEditValue.facultyImg ||
      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    );
  };

  // Handle image source type change
  const handleImageSourceChange = (type: string) => {
    setImgAddingFromType(type);

    if (type === "externalImg") {
      // When switching to external URL, pre-fill with current image URL if it's external
      if (
        inpModalEditValue.facultyImg &&
        inpModalEditValue.facultyImg.startsWith("http")
      ) {
        setExternalImageUrl(inpModalEditValue.facultyImg);
      } else if (inpModalEditValue.facultyImg) {
        // If it's a data URL (from file upload), clear the external URL field
        setExternalImageUrl("");
        setImgValidationError(
          "Switch to upload image to use the current image"
        );
      } else {
        setExternalImageUrl("");
      }
    } else {
      // When switching back to internal, clear external URL
      setExternalImageUrl("");
      setImgValidationError("");
      setIsValidating(false);
      setIsImageLoading(false);
    }
  };

  function handleDeleteFaculty() {
    dispatch(deleteFacultyAdmin(idxModalDeleteFaculty));
    setModalDeleteFaculty(false);
  }

  useEffect(() => {
    dispatch(
      getAndPaginateFacultiesAdmin({
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, page, rowsPerPage]);

  return (
    <>
      <div className="faculties_admin_component max-w-6xl mx-auto">
        <section className="block_1_faculties_admin_component flex justify-between">
          <h1>
            {t("faculties.t1")} {facultiesAdmin?.items || 0} {t("faculties.t2")}
          </h1>
          <AddIcon
            sx={{
              cursor: "pointer",
              fontSize: "29px",
            }}
            onClick={() => {
              setModalAddFaculty(true);
            }}
          />
        </section>
        <ModalAddFaculty
          modalAddFaculty={modalAddFaculty}
          setModalAddFaculty={setModalAddFaculty}
        />
        <section className="block_2_faculties_admin_component flex flex-wrap justify-center gap-3 mt-5">
          {loadingFacultiesAdmin ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : facultiesAdmin?.data?.length ? (
            facultiesAdmin.data.map((item: any) => (
              <div className="each_faculties_admin_block" key={item.id}>
                <EachFacultyAdmin
                  key={item.id}
                  id={item.id}
                  facultyImg={item.facultyImg}
                  facultyName={item.facultyName}
                />
                <div className="block_functionalities flex justify-between mt-1 px-1">
                  <button
                    className="cursor-pointer bg-none text-[green] px-5 py-2 rounded-[10px] hover:text-[brown] text-[30px] outline-none"
                    onClick={() => {
                      setModalEditFaculty(true);
                      setEditingFacultyId(item.id);
                      // Set all the values from the item
                      setInpModalEditValue({
                        id: item.id,
                        facultyImg: item.facultyImg || "",
                        facultyName: item.facultyName || "",
                        about: item.about || "",
                        yearOfOpening: item.yearOfOpening || "",
                        dean: item.dean || "",
                        students: item.students || "",
                      });

                      // Pre-fill external URL if the image is from external source
                      if (
                        item.facultyImg &&
                        item.facultyImg.startsWith("http")
                      ) {
                        setExternalImageUrl(item.facultyImg);
                        setImgAddingFromType("externalImg");
                        setSelectedFileName("");
                      } else if (
                        item.facultyImg &&
                        item.facultyImg.startsWith("data:image")
                      ) {
                        // If it's a data URL (previously uploaded file)
                        setImgAddingFromType("internalImg");
                        setSelectedFileName("Uploaded image");
                        setExternalImageUrl("");
                        setImgValidationError("");
                        setIsValidating(false);
                        setIsImageLoading(false);
                      } else {
                        setExternalImageUrl("");
                        setImgAddingFromType("internalImg");
                        setImgValidationError("");
                        setIsValidating(false);
                        setSelectedFileName("");
                        setIsImageLoading(false);
                      }
                    }}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="cursor-pointer bg-none text-[red] px-5 py-2 rounded-[10px] hover:text-[#00abfa] text-[30px] outline-none"
                    onClick={() => {
                      setIdxModalDeleteFaculty(item.id);
                      setModalDeleteFaculty(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="dark:text-white">Faculties not found</h1>
          )}
        </section>

        {/* Edit Faculty Dialog */}
        <Dialog
          open={modalEditFaculty}
          handler={handleCloseModalEditFaculty}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="max-h-[90vh] overflow-auto"
        >
          <div className="block_modal_add_faculty px-2">
            <form
              className="form_modal_add_faculty"
              onSubmit={handleEditFaculty}
            >
              <DialogHeader
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {"Edit Faculty"}
              </DialogHeader>
              <div className="block_inputs_add_faculty space-y-4 mt-4">
                <div className="block_1_img_and_img_input flex flex-col gap-3">
                  <div className="relative inline-block mx-auto">
                    <img
                      src={getImageSrc()}
                      alt="Faculty preview"
                      className="w-[70px] h-[70px] rounded-full object-cover"
                      onError={(e) => {
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
                    className="cursor-pointer outline-none px-2 py-2 border border-gray-300 rounded-md"
                    value={imgAddingFromType}
                    onChange={(e) => handleImageSourceChange(e.target.value)}
                  >
                    <option value="internalImg">Upload image</option>
                    <option value="externalImg">External image URL</option>
                  </select>

                  {imgAddingFromType === "internalImg" ? (
                    <div className="flex flex-col gap-1">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        onChange={handleFileChange}
                        className="w-full cursor-pointer"
                        id="fileInput"
                        required={!inpModalEditValue.facultyImg}
                      />
                      {selectedFileName && (
                        <p className="text-xs text-green-600">
                          Selected: {selectedFileName}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF, WEBP (Max 5MB)
                      </p>
                      {imgValidationError && (
                        <p className="text-red-500 text-xs">
                          {imgValidationError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <TextField
                        type="url"
                        label="Enter image URL (e.g., https://example.com/image.jpg)"
                        variant="outlined"
                        value={externalImageUrl}
                        onChange={(e) =>
                          handleInputChange("facultyImg", e.target.value)
                        }
                        required={!inpModalEditValue.facultyImg}
                        error={!!imgValidationError}
                        helperText={imgValidationError}
                      />
                      {isValidating && (
                        <p className="text-blue-500 text-xs">
                          Validating image...
                        </p>
                      )}
                      {!isValidating &&
                        !imgValidationError &&
                        externalImageUrl && (
                          <p className="text-green-500 text-xs">
                            ✓ Image URL is valid!
                          </p>
                        )}
                    </div>
                  )}
                </div>

                <TextField
                  type="text"
                  label="Name of faculty"
                  variant="outlined"
                  fullWidth
                  required
                  value={inpModalEditValue.facultyName || ""}
                  onChange={(e) =>
                    handleInputChange("facultyName", e.target.value)
                  }
                />

                <div className="flex flex-col gap-1">
                  <label htmlFor="facultyAbout" className="cursor-pointer">
                    About this faculty <span className="text-[red]">*</span>
                  </label>
                  {/* <textarea
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px] h-[200px]"
                    id="facultyAbout"
                    placeholder="Enter about this faculty"
                    value={inpModalEditValue.about || ""}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    required
                    /> */}
                  <TextareaAutosize
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px]"
                    id="facultyAbout"
                    placeholder="Enter about this faculty"
                    value={inpModalEditValue.about || ""}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    required
                    aria-label="empty textarea"
                    style={{
                      height: `200px`,
                    }}
                  />
                </div>

                <TextField
                  type="number"
                  label="Enter the opening year (YYYY)"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    inputProps: {
                      min: 1000,
                      max: new Date().getFullYear(),
                    },
                  }}
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.value.length > 4) {
                      input.value = input.value.slice(0, 4);
                    }
                  }}
                  value={inpModalEditValue.yearOfOpening || ""}
                  onChange={(e) =>
                    handleInputChange("yearOfOpening", e.target.value)
                  }
                />

                <TextField
                  type="text"
                  label="Enter the dean of faculty"
                  variant="outlined"
                  fullWidth
                  required
                  value={inpModalEditValue.dean || ""}
                  onChange={(e) => handleInputChange("dean", e.target.value)}
                />

                <TextField
                  type="number"
                  label="Number of students"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  value={inpModalEditValue.students || ""}
                  onChange={(e) =>
                    handleInputChange("students", e.target.value)
                  }
                />
              </div>

              <DialogFooter
                className="flex justify-center gap-2 p-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  variant="filled"
                  color="red"
                  size="sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={handleCloseModalEditFaculty}
                >
                  Close
                </Button>
                <Button
                  variant="filled"
                  color="green"
                  size="sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  type="submit"
                  disabled={
                    !!imgValidationError || isValidating || isImageLoading
                  }
                >
                  {isValidating || isImageLoading ? "Validating..." : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </Dialog>

        {/* Modal Delete */}
        <Dialog
          open={modalDeleteFaculty}
          handler={handleCloseModalDeleteFaculty}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="block_modal_delete">
            <DialogHeader
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Do you really want to delete this faculty?
            </DialogHeader>

            <DialogFooter
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="flex gap-2"
            >
              <Button
                variant="gradient"
                color="green"
                onClick={handleCloseModalDeleteFaculty}
                className="outline-none"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span>No</span>
              </Button>
              <Button
                variant="gradient"
                color="red"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={handleDeleteFaculty}
              >
                <span>Yes</span>
              </Button>
            </DialogFooter>
          </div>
        </Dialog>

        <section className="section_3_pagination">
          <div className="for_pagionation_of_faculties flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={facultiesAdmin?.items || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default FacultiesAdmin;
