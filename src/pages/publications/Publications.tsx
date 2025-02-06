// Images
import { useTranslation } from "react-i18next";
import teacherImage from "../../assets/bg-image.jpg";

import EachPublication from "../../components/eachPublication/EachPublication";
import { TablePagination } from "@mui/material";
import React from "react";

const Publications = () => {
  //for translation
  const { t } = useTranslation();

  //Pagination
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
  return (
    <>
      <div className="publications_component dark:bg-[#091220] duration-300 py-6">
        <section className="publications mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("publications.t1")} 1000 {t("publications.t2")}
          </h1>
          <div className="block_of_publications flex flex-wrap justify-center gap-3 mt-5">
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
          </div>
          <div className="for_pagionation_of_publications flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={100}
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
