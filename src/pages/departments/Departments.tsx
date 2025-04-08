import { useTranslation } from "react-i18next";
import EachDepartment from "../../components/eachDepartment/EachDepartment";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { getAndSearchDepartments } from "../../api/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const Departments = () => {
  const { t } = useTranslation();

  // Redux Toolkit

  //Dispatch
  const dispatch = useAppDispatch();

  const loadingDepartments = useAppSelector(
    (state) => state.states.loadingDepartments
  );
  const departments: any = useAppSelector((state) => state.states.departments);

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
      getAndSearchDepartments({
        departmentName: value,
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, value, page, rowsPerPage]);

  return (
    <>
      <div className="departments_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_departments_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("departments.t1")} {departments ? departments?.items : 0}{" "}
            {t("departments.t2")}
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(event.target.value);
                }}
                type="search"
                label="Search the departments"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          </div>
          <div className="block_of_departments mt-5 flex flex-col gap-3 px-4">
            {loadingDepartments === false && departments?.data?.length !== 0 ? (
              departments?.data
                ?.filter((item: any) => {
                  return item.departmentName
                    .toLowerCase()
                    .includes(value.trim().toLowerCase());
                })
                .map((item: any) => {
                  return (
                    <EachDepartment
                      id={item.id}
                      key={item.id}
                      department={item.departmentName}
                    />
                  );
                })
            ) : loadingDepartments === true &&
              departments?.data?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingDepartments === false &&
                departments?.data?.length === 0) ||
              (loadingDepartments === false && departments === undefined && (
                <h1 className="dark:text-white">Departments not found</h1>
              ))
            )}
            {/* <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} /> */}
          </div>

          <div className="for_pagionation_of_departments flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={departments ? departments?.items : 0}
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

export default Departments;
