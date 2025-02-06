//Images
import { useTranslation } from "react-i18next";
import facultyImage from "../../assets/bg-image.jpg";
import EachFaculty from "../../components/eachFaculty/EachFaculty";
import { TablePagination } from "@mui/material";
import React from "react";

const Faculties = () => {
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
      <div className="faculties_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_faculties_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("faculties.t1")} 18 {t("faculties.t2")}
          </h1>

          <div className="block_of_faculties flex flex-wrap justify-center gap-3 mt-5">
            <EachFaculty facultyImg={facultyImage} facultyName={`Biology`} />
            <EachFaculty
              facultyImg={facultyImage}
              facultyName={`Mechanich and Mathematics`}
            />
            <EachFaculty facultyImg={facultyImage} facultyName={`Rights`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Physics`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
          </div>

          <div className="for_pagionation_of_faculties flex justify-center dark:bg-white mt-6">
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

export default Faculties;
