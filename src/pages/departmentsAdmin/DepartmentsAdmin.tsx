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
} from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getAndPaginateDepartmentsAdmin } from "../../api/api";
import { MdDelete, MdEdit } from "react-icons/md";
import EachDepartmentAdmin from "../../components/eachDepartmentAdmin/EachDepartmentAdmin";

const DepartmentsAdmin = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  // States from redux
  const { loadingDepartmentsAdmin, departmentsAdmin } = useAppSelector(
    (state) => state.states
  );

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
  const [inpDepartmentDeanValue, setInpDepartmentDeanValue] =
    useState<string>("");
  const [
    inpDepartmentAmountStudentsValue,
    setInpDepartmentAmountStudentsValue,
  ] = useState<string>("");
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
      const finalImage = imgAddDepartment;
  
      let newDepartment = {
        id: Date.now().toString(),
        facultyId: Date.now().toString(),
        departmentImg: finalImage,
        departmentName: inpDepartmentNameValue,
        about: inpDepartmentAboutValue,
        yearOfOpening: Number(inpOpenedYearValue),
        headOfDepartment: "",
      };
  
      // dispatch(
      //   addFacultyAdmin({
      //     newFaculty: newFaculty,
      //   })
      // );
  
      setModalAddDepartment(false);
      setImgAddDepartment(null);
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
          <div className="block_modal_add_department px-2">
            <form action="">
              <DialogTitle id="alert-dialog-title">
                {"Add Department"}
              </DialogTitle>
              <div className="blocks_input_add_department">
                <div className="block_img_select_input">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Input img type
                    </InputLabel>
                    <Select
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
                        onChange={handChangeImgAddDepartment}
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
