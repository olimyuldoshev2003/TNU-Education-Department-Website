import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  // TextareaAutosize,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  getAndPaginateDepartmentsAdmin,
  getFacultiesForId,
} from "../../api/api";
import { MdDelete, MdEdit } from "react-icons/md";
import EachDepartmentAdmin from "../../components/eachDepartmentAdmin/EachDepartmentAdmin";

const DepartmentsAdmin = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  // States from redux
  const { loadingDepartmentsAdmin, departmentsAdmin, facultiesForId } =
    useAppSelector((state) => state.states);

  const [modalAddDepartment, setModalAddDepartment] = useState<boolean>(false);
  // const [modalEditDepartment, setModalEditDepartment] =
  //   useState<boolean>(false);
  // const [modalDeleteDepartment, setModalDeleteDepartment] =
  //   useState<boolean>(false);

  // States Input Modal Add
  const [facultyIdDepartment, setfacultyIdDepartment] = useState<any>(null);
  const [imgAddDepartment, setImgAddDepartment] = useState<any>(null);
  const [inpDepartmentNameValue, setInpDepartmentNameValue] =
    useState<string>("");
  const [inpDepartmentAboutValue, setInpDepartmentAboutValue] =
    useState<string>("");
  const [inpOpenedYearValue, setInpOpenedYearValue] = useState<string>("");
  const [inpHeadOfDepartmentValue, setInpHeadOfDepartmentValue] =
    useState<string>("");
  const [imgAddingFromType, setImgAddingFromType] =
    useState<string>("internalImg");
  const [imgValidationError, setImgValidationError] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

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

  function handleCloseModalAddDepartment() {
    setModalAddDepartment(false);
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
    if (!url.trim()) {
      setImgAddDepartment(null);
      setImgValidationError("Image URL is required");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      setImgValidationError("Please enter a valid URL");
      setImgAddDepartment(null);
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
      setImgAddDepartment(null);
      return;
    }

    setIsImageLoading(true);

    // Check if the image exists and is accessible
    const isValid = await validateImageUrl(url);

    if (isValid) {
      setImgAddDepartment(url);
      setImgValidationError("");
    } else {
      setImgAddDepartment(null);
      setImgValidationError("Image not found or inaccessible");
    }

    setIsImageLoading(false);
  };

  function handChangeImgAddDepartment(event: any) {
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
        setImgAddDepartment(event.target.result);
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

  function handleChangeFacultyIdDepartment(event: SelectChangeEvent<string>) {
    setfacultyIdDepartment(event.target.value);
  }

  function handleChangeDepartmentNameValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpDepartmentNameValue(event.target.value);
  }
  function handleChangeDepartmentAboutValue(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setInpDepartmentAboutValue(event.target.value);
  }
  function handleChangeOpenedYearValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpOpenedYearValue(event.target.value);
  }
  function handleChangeHeadOfDepartmentValue(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setInpHeadOfDepartmentValue(event.target.value);
  }

  function handleAddDepartment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate all fields including image
    if (!imgAddDepartment) {
      setImgValidationError("Department image is required");
      return;
    }

    if (
      facultyIdDepartment.trim().length === 0 ||
      inpDepartmentNameValue.trim().length === 0 ||
      inpDepartmentAboutValue.trim().length === 0 ||
      inpOpenedYearValue.trim().length === 0 ||
      inpHeadOfDepartmentValue.trim().length === 0
    ) {
      alert("Fill all required fields");
      return;
    }

    // Use fallback image if external URL is invalid
    const finalImage = imgAddDepartment;

    let newDepartment = {
      id: Date.now().toString(),
      facultyId: facultyIdDepartment,
      departmentImg: finalImage,
      departmentName: inpDepartmentNameValue,
      about: inpDepartmentAboutValue,
      yearOfOpening: Number(inpOpenedYearValue),
      headOfDepartment: inpHeadOfDepartmentValue,
    };

    // dispatch(
    //   addDepartmentAdmin({
    //     newDepartment: newDepartment,
    //   })
    // );

    setModalAddDepartment(false);
    setImgAddDepartment(null);
    setImgAddDepartment("");
    setInpDepartmentNameValue("");
    setInpDepartmentAboutValue("");
    setInpOpenedYearValue("");
    setImgValidationError("");
  }

  // Get the image source for preview
  const getImageSrc = () => {
    if (imgAddingFromType === "internalImg" && imgAddDepartment) {
      return imgAddDepartment;
    } else if (imgAddingFromType === "externalImg" && imgAddDepartment) {
      return imgAddDepartment;
    }
    return "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
  };

  useEffect(() => {
    dispatch(
      getAndPaginateDepartmentsAdmin({
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    dispatch(getFacultiesForId());
  }, [dispatch]);
  return (
    <>
      <div className="departments_admin_component max-w-6xl mx-auto">
        <section className="section_1_departments_admin flex justify-between">
          <h1>
            {t("departments.t1")} {departmentsAdmin?.items || 0}{" "}
            {t("departments.t2")}
          </h1>
          <AddIcon
            sx={{
              cursor: "pointer",
              fontSize: "29px",
            }}
            onClick={() => {
              setModalAddDepartment(true);
            }}
          />
        </section>

        <section className="section_2_departments_admin mt-5 flex flex-col gap-3 px-4">
          {loadingDepartmentsAdmin ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : departmentsAdmin?.data?.length ? (
            departmentsAdmin?.data?.map((item: any) => (
              <div
                className="each_departments_admin_block flex sm:flex-wrap md:flex-nowrap"
                key={item.id}
              >
                <EachDepartmentAdmin
                  key={item.id}
                  departmentName={item.departmentName}
                />
                <div className="block_functionalities flex justify-between mt-1 px-1">
                  <button className="cursor-pointer bg-none text-[green] px-5 py-2 rounded-[10px] hover:text-[brown] text-[30px] outline-none">
                    <MdEdit />
                  </button>
                  <button className="cursor-pointer bg-none text-[red] px-5 py-2 rounded-[10px] hover:text-[#00abfa] text-[30px] outline-none">
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="dark:text-white">Faculties not found</h1>
          )}
        </section>

        {/* Modal Add Department */}
        <Dialog
          open={modalAddDepartment}
          onClose={handleCloseModalAddDepartment}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="block_modal_add_department px-2 max-w-[360px]">
            <form action="" onSubmit={handleAddDepartment}>
              <DialogTitle id="alert-dialog-title">
                {"Add Department"}
              </DialogTitle>
              <div className="blocks_input_add_department">
                <div className="block_1_img_select_input">
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
                  <FormControl
                    fullWidth
                    sx={{
                      marginTop: `10px`,
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Input img type
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={imgAddingFromType}
                      label="Input img type"
                      onChange={(event: SelectChangeEvent<string>) => {
                        setImgAddingFromType(event.target.value);
                        setImgAddDepartment(null);
                        setImgValidationError("");
                      }}
                      className="max-w-[400px]"
                      sx={{
                        maxWidth: `100%`,
                        width: `347px`,
                      }}
                    >
                      <MenuItem value={`internalImg`}>Upload image</MenuItem>
                      <MenuItem value={`externalImg`}>
                        External image URL
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div className="block_inp_file_and_url mt-3">
                    {imgAddingFromType === "internalImg" ? (
                      <div className="flex flex-col gap-1">
                        <input
                          type="file"
                          accept="image/jpeg, image/png, image/gif, image/webp"
                          onChange={handChangeImgAddDepartment}
                          className="w-full cursor-pointer"
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Supported formats: JPG, PNG, GIF, WEBP (Max 5MB)
                        </p>
                      </div>
                    ) : imgAddingFromType === "externalImg" ? (
                      <div className="flex flex-col gap-1">
                        <TextField
                          type="url"
                          id="outlined-basic"
                          label="Enter image URL (e.g., https://example.com/image.jpg)"
                          variant="outlined"
                          className="w-full outline-none px-2 py-1 border-[1px] border-gray-500 rounded-[5px]"
                          onChange={handChangeImgAddDepartment}
                          required
                        />
                        {imgValidationError && (
                          <p className="text-red-500 text-xs">
                            {imgValidationError}
                          </p>
                        )}
                        {!imgValidationError && imgAddDepartment && (
                          <p className="text-green-500 text-xs">
                            Image URL is valid!
                          </p>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="block_2_select_faculty_id_of_department mt-4">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Faculty based this department
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Faculty based this department"
                      value={facultyIdDepartment}
                      onChange={handleChangeFacultyIdDepartment}
                      className="max-w-[400px]"
                      sx={{
                        maxWidth: `100%`,
                        width: `347px`,
                      }}
                    >
                      <MenuItem value={``}>None</MenuItem>
                      {facultiesForId?.map((item: any) => {
                        return (
                          <MenuItem value={item.id}>
                            {item.facultyName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="block_3_department_name mt-4">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Enter the name of department"
                    variant="outlined"
                    value={inpDepartmentNameValue}
                    sx={{
                      width: `100%`,
                    }}
                    onChange={handleChangeDepartmentNameValue}
                    required
                  />
                </div>
                <div className="block_4_department_about mt-4">
                  {/* <label htmlFor="departmentAbout" className="cursor-pointer">
                    About this department <span className="text-[red]">*</span>
                  </label> */}
                  <textarea
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px] h-[200px] w-full"
                    id="departmentAbout"
                    placeholder="About this department"
                    value={inpDepartmentAboutValue}
                    onChange={handleChangeDepartmentAboutValue}
                    required
                  />
                  {/* <TextareaAutosize
                    // aria-label="empty textarea"
                    className="border-[1px] border-gray-400 px-2 py-1 rounded-[5px] outline-none text-[14px] h-[200px] w-full"
                    id="departmentAbout"
                    placeholder="About this department"
                    value={inpDepartmentAboutValue}
                    onChange={handleChangeDepartmentAboutValue}
                    required
                    style={{
                      height: `200px`,
                    }}
                    maxRows={4}
                  /> */}
                </div>
                <div className="block_5_department_opening_year mt-4">
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
                    value={inpOpenedYearValue}
                    onChange={handleChangeOpenedYearValue}
                  />
                </div>
                <div className="block_6_head_of_deparment">
                  <TextField
                    type="text"
                    label="Head of department"
                    variant="outlined"
                    fullWidth
                    required
                    value={inpHeadOfDepartmentValue}
                    onChange={handleChangeHeadOfDepartmentValue}
                  />
                </div>
              </div>
              <DialogActions>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCloseModalAddDepartment}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  type="submit"
                  autoFocus
                >
                  Add
                </Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>

        <section className="section_3_pagination">
          <div className="for_pagionation_of_faculties flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={departmentsAdmin?.items || 0}
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

export default DepartmentsAdmin;
