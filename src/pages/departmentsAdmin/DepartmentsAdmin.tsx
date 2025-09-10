import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, TablePagination } from "@mui/material";
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
  const [modalEditDepartment, setModalEditDepartment] =
    useState<boolean>(false);
  const [modalDeleteDepartment, setModalDeleteDepartment] =
    useState<boolean>(false);

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
              <div className="each_departments_admin_block flex sm:flex-wrap md:flex-nowrap" key={item.id}>
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
          <div className="block_modal_add_department">
            <form action="">
              <DialogTitle id="alert-dialog-title">
                {"Add Department"}
              </DialogTitle>
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
