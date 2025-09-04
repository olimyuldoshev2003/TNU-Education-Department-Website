//Material UI
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalAddFaculty from "../../components/modalAddFaculty/ModalAddFaculty";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TablePagination } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAndPaginateFacultiesAdmin } from "../../api/api";
import EachFacultyAdmin from "../../components/eachFacultyAdmin/eachFacultyAdmin";

const FacultiesAdmin = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  //States
  const [modalAddFaculty, setModalAddFaculty] = useState<boolean>(false);

  // States from redux
  const { loadingFacultiesAdmin, facultiesAdmin } = useAppSelector(
    (state) => state.states
  );

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
        <section className="block_2_faculties_admin_component  flex flex-wrap justify-center gap-3 mt-5">
          {loadingFacultiesAdmin ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : facultiesAdmin?.data?.length ? (
            facultiesAdmin.data.map((item: any) => (
              <EachFacultyAdmin
                key={item.id}
                id={item.id}
                facultyImg={item.facultyImg}
                facultyName={item.facultyName}
              />
            ))
          ) : (
            <h1 className="dark:text-white">Faculties not found</h1>
          )}
        </section>
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
