// Images
import { useTranslation } from "react-i18next";
import EachPublication from "../../components/eachPublication/EachPublication";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAndSearchPublications } from "../../api/api";

const Publications = () => {
  //for translation
  const { t } = useTranslation();

  // Redux Toolkit

  //Dispatch
  const dispatch = useAppDispatch();

  const loadingPublications = useAppSelector(
    (state) => state.states.loadingPublications
  );
  const publications: any = useAppSelector(
    (state) => state.states.publications
  );

  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      getAndSearchPublications({
        departmentName: value,
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [dispatch, value, page, rowsPerPage]);
  return (
    <>
      <div className="publications_component dark:bg-[#091220] duration-300 py-6">
        <section className="publications mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("publications.t1")} {publications ? publications?.items : 0}{" "}
            {t("publications.t2")}
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                type="search"
                label="Search the publications"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="block_of_publications flex flex-wrap justify-center gap-3 mt-5">
            {loadingPublications === false &&
            publications?.data?.length !== 0 ? (
              publications?.data
                ?.filter((item: any) => {
                  return item.publicationName
                    .toLowerCase()
                    .includes(value.trim().toLowerCase());
                })
                .map((item: any) => {
                  return (
                    <EachPublication
                      id={item.id}
                      key={item.id}
                      publicationImg={item.publicationImg}
                      publicationName={item.publicationName}
                      publicationAuthor={item.publicationAuthor}
                    />
                  );
                })
            ) : loadingPublications === true &&
              publications?.data?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingPublications === false &&
                publications?.data?.length === 0) ||
              (loadingPublications === false && publications === undefined && (
                <h1 className="dark:text-white">publications not found</h1>
              ))
            )}
            {/* <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            /> */}
          </div>
          <div className="for_pagionation_of_publications flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={publications ? publications?.items : 0}
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

export default Publications;
