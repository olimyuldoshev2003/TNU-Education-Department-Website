//Images
import { Link, useParams } from "react-router-dom";
import EachPublication from "../../components/eachPublication/EachPublication";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Teacher = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  // Loading
  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [loadingPublicationsOfTeacher, setLoadingPublicationsOfTeacher] =
    useState(false);

  // Data
  const [teacher, setTeacher] = useState<any>([]);

  const [facultyOfTeacher, setFacultyOfTeacher] = useState<any>([]);
  const [facultyOfDepartment, setFacultyOfDepartment] = useState<any>([]);
  const [publicationsOfTeacher, setPublicationsOfTeacher] = useState<any>([]);

  // Search
  const [valuePublications, setValuePublications] = useState("");

  // Pagination
  const [pagePublications, setPagePublications] = React.useState(0);
  const [rowsPerPagePublications, setRowsPerPagePublications] =
    React.useState(10);

  const handleChangePagePublications = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagePublications(newPage);
  };

  const handleChangeRowsPerPagePublications = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPagePublications(parseInt(event.target.value, 10));
    setPagePublications(0);
  };

  async function getTeacherById() {
    setLoadingTeacher(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/teachers/${id}`);
      setTeacher(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTeacher(false);
    }
  }

  async function getAndSearchPublicationsOfTeacher() {
    setLoadingPublicationsOfTeacher(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications?teacherId=${id}&_page=${pagePublications + 1}&_per_page=${rowsPerPagePublications}`
      );
      setPublicationsOfTeacher(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPublicationsOfTeacher(false);
    }
  }

  async function getFacultyByFacultyIdOfTeacher() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/faculties/${teacher.facultyId}`
      );
      setFacultyOfTeacher(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getDepartmentByDepartmentIdOfTeacher() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/departments/${teacher.departmentId}`
      );
      setFacultyOfDepartment(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTeacherById();
  }, []);

  useEffect(() => {
    getAndSearchPublicationsOfTeacher();
  }, [valuePublications, pagePublications, rowsPerPagePublications]);

  useEffect(() => {
    getFacultyByFacultyIdOfTeacher();
    getDepartmentByDepartmentIdOfTeacher();
  });

  return (
    <>
      <div className="teacher_component dark:bg-[#091220] duration-300">
        <div className="block_teacher_component py-5 px-5 max-w-6xl mx-auto">
          {loadingTeacher ? (
            <div>
              <h1 className="dark:text-white">Loading...</h1>
            </div>
          ) : (
            <div className="main_block_of_teacher flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
              <div className="teacher_block_1_img">
                <img
                  src={teacher.teacherImg}
                  alt=""
                  className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px] object-cover object-center"
                />
              </div>
              <div className="teacher_block_2">
                <h1 className="font-bold text-2xl text-center dark:text-white duration-300">
                  {teacher.teachername}
                </h1>
                <p className="max-w-md text-justify dark:text-white duration-300">
                  {teacher.about}
                </p>
                <h2 className="mt-3 dark:text-white duration-300">
                  {t("teacher.t1")}:{" "}
                  <span className="font-bold">{teacher.dateOfBirth} </span>{" "}
                  {t("teacher.t2")}
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  {t("teacher.t3")}:{" "}
                  <Link
                    to={`/faculty/${facultyOfTeacher.id}`}
                    className="font-bold hover:underline hover:text-red-500"
                  >
                    {facultyOfTeacher.facultyName}
                  </Link>
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  {t("teacher.t4")}:{" "}
                  <Link
                    to={`/department/${facultyOfDepartment.id}`}
                    className="font-bold hover:underline hover:text-red-500"
                  >
                    {facultyOfDepartment.departmentName}
                  </Link>
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  {t("teacher.t5")}{" "}
                  <span className="font-bold">{teacher.teacherName}</span>{" "}
                  {t("teacher.t6")}:{" "}
                  <span className="font-bold">
                    {teacher.joinedToThisFaculty}{" "}
                  </span>{" "}
                  {t("teacher.t7")}
                </h2>
              </div>
            </div>
          )}

          <div className="block_of_publications_of_this_department mt-12">
            <h1 className="text-center text-3xl dark:text-white duration-300">
              <span className="font-bold">{teacher.teacherName}</span>{" "}
              {t("teacher.t8")}{" "}
              <span className="font-bold">
                {publicationsOfTeacher.items || 0}
              </span>{" "}
              {t("teacher.t9")}
            </h1>
            <div className="for_search_and_filter">
              <div className="for_input w-1/2 mx-auto mt-2">
                <Input
                  value={valuePublications}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValuePublications(event.target.value);
                  }}
                  type="search"
                  label="Search the publications"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  className="dark:text-white"
                />
              </div>
            </div>
            <div className="publications_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
              {loadingPublicationsOfTeacher ? (
                <h1 className="dark:text-white">...Loading</h1>
              ) : publicationsOfTeacher?.data?.length ? (
                publicationsOfTeacher.data
                  .filter((item: any) =>
                    item.publicationName
                      .toLowerCase()
                      .includes(valuePublications.trim().toLowerCase())
                  )
                  .map((item: any) => (
                    <EachPublication
                      id={item.id}
                      key={item.id}
                      publicationImg={item.publicationImg}
                      publicationName={item.publicationName}
                    />
                  ))
              ) : (
                <h1 className="dark:text-white">Publications not found</h1>
              )}
              {/* <EachPublication
                publicationImg={teacherImg}
                publicationName={"Rich Dad, Poor Dad"}
                publicationAuthor={"Robert T. Kiyosaki"}
              />
              <EachPublication
                publicationImg={teacherImg}
                publicationName={"Rich Dad, Poor Dad"}
                publicationAuthor={"Robert T. Kiyosaki"}
              /> */}
            </div>
            <div className="for_pagionation_of_publications flex justify-center dark:bg-white mt-6">
              <TablePagination
                component="div"
                count={publicationsOfTeacher.items || 0}
                page={pagePublications}
                onPageChange={handleChangePagePublications}
                rowsPerPage={rowsPerPagePublications}
                onRowsPerPageChange={handleChangeRowsPerPagePublications}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teacher;
