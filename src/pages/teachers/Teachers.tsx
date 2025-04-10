import EachTeacher from "../../components/eachTeacher/EachTeacher";

//Images
import { useTranslation } from "react-i18next";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getAndSearchTeachers } from "../../api/api";

const Teachers = () => {
  const { t } = useTranslation();

  // Redux Toolkit

  //Dispatch
  const dispatch = useAppDispatch();

  const loadingTeachers = useAppSelector(
    (state) => state.states.loadingTeachers
  );
  const teachers: any = useAppSelector((state) => state.states.teachers);

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
      getAndSearchTeachers({
        teacherName: value,
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, value, page, rowsPerPage]);

  return (
    <>
      <div className="teachers_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_teachers_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("teachers.t1")} {teachers?.items || 0} {t("teachers.t2")}
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                type="search"
                label="Search the teachers"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(event.target.value);
                }}
                className="dark:text-white"
              />
            </div>
          </div>
          <div className="block_of_teachers flex flex-wrap justify-center gap-3 mt-5">
            {/* {loadingTeachers === false && teachers?.data?.length !== 0 ? (
              teachers?.data
                ?.filter((item: any) => {
                  return item.teacherName
                    .toLowerCase()
                    .includes(value.trim().toLowerCase());
                })
                .map((item: any) => {
                  return (
                    <EachTeacher
                      id={item.id}
                      key={item.id}
                      teacherImg={item.teacherImg}
                      teacherName={item.teacherName}
                      teacherJobLevel={item.teacherJobLevel}
                    />
                  );
                })
            ) : loadingTeachers === true && teachers?.data?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingTeachers === false && teachers?.data?.length === 0) ||
              (loadingTeachers === false && teachers === undefined && (
                <h1 className="dark:text-white">teachers not found</h1>
              ))
            )} */}

            {loadingTeachers ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : teachers?.data?.length ? (
              teachers.data
                .filter((item: any) =>
                  item.teacherName
                    .toLowerCase()
                    .includes(value.trim().toLowerCase())
                )
                .map((item: any) => (
                  <EachTeacher
                    id={item.id}
                    key={item.id}
                    teacherImg={item.teacherImg}
                    teacherName={item.teacherName}
                    teacherJobLevel={item.teacherJobLevel}
                  />
                ))
            ) : (
              <h1 className="dark:text-white">Teachers not found</h1>
            )}

            {/* <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            /> */}
          </div>

          <div className="for_pagionation_of_teachers flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={teachers?.items || 0}
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

export default Teachers;
