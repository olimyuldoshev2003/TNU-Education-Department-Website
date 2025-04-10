//Images
import { useTranslation } from "react-i18next";
// import facultyImage from "../../assets/bg-image.jpg";
import EachFaculty from "../../components/eachFaculty/EachFaculty";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAndSearchFaculties } from "../../api/api";

const Faculties = () => {
  const { t } = useTranslation();

  // Redux Toolkit

  //Dispatch
  const dispatch = useAppDispatch();

  const loadingFaculties = useAppSelector(
    (state) => state.states.loadingFaculties
  );
  const faculties: any = useAppSelector((state) => state.states.faculties);

  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Search
  const [value, setValue] = useState("");

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

  // Run the database
  useEffect(() => {
    dispatch(
      getAndSearchFaculties({
        facultyName: value,
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, value, page, rowsPerPage]);

  return (
    <>
      <div className="faculties_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_faculties_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("faculties.t1")} {faculties?.items || 0} {t("faculties.t2")}
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(event.target.value);
                }}
                type="search"
                label="Search the faculties"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          </div>
          <div className="block_of_faculties flex flex-wrap justify-center gap-3 mt-5">
            {/* <EachFaculty facultyImg={facultyImage} facultyName={`Biology`} /> */}
            {/* {loadingFaculties === false && faculties?.data?.length !== 0 ? (
              faculties?.data
                ?.filter((item: any) => {
                  return item.facultyName
                    .toLowerCase()
                    .includes(value.trim().toLowerCase());
                })
                .map((item: any) => {
                  return (
                    <EachFaculty
                      key={item.id}
                      id={item.id}
                      facultyImg={item.facultyImg}
                      facultyName={item.facultyName}
                    />
                  );
                })
            ) : loadingFaculties === true && faculties?.data?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingFaculties === false && faculties?.data?.length === 0) ||
              (loadingFaculties === false && faculties === undefined && (
                <h1 className="dark:text-white">Faculties not found</h1>
              ))
            )} */}
            {loadingFaculties ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : faculties?.data?.length ? (
              faculties.data
                .filter((item: any) =>
                  item.facultyName
                    .toLowerCase()
                    .includes(value.trim().toLowerCase())
                )
                .map((item: any) => (
                  <EachFaculty
                    key={item.id}
                    id={item.id}
                    facultyImg={item.facultyImg}
                    facultyName={item.facultyName}
                  />
                ))
            ) : (
              <h1 className="dark:text-white">Faculties not found</h1>
            )}
          </div>

          <div className="for_pagionation_of_faculties flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={faculties?.items || 0}
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

export default Faculties;
