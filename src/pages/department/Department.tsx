//Images
import { Input } from "@material-tailwind/react";
import EachTeacher from "../../components/eachTeacher/EachTeacher";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import EachPublication from "../../components/eachPublication/EachPublication";
import { useParams } from "react-router-dom";
import axios from "axios";

const Department = () => {
  const { id } = useParams();

  // Loading
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [loadingTeachersOfDepartment, setLoadingTeachersOfDepartment] =
    useState(false);
  const [loadingPublicationsOfDepartment, setLoadingPublicationsOfDepartment] =
    useState(false);

  // Data
  const [department, setDepartment] = useState<any>([]);
  const [teachersOfDepartment, setTeachersOfDepartment] = useState<any>([]);
  const [publicationsOfDepartment, setPublicationsOfDepartment] = useState<any>(
    []
  );

  // Search
  const [valueTeachers, setValueTeachers] = useState("");
  const [valuePublications, setValuePublications] = useState("");

  // Pagination
  const [pageTeachers, setPageTeachers] = React.useState(0);
  const [rowsPerPageTeachers, setRowsPerPageTeachers] = React.useState(10);

  const [pagePublications, setPagePublications] = React.useState(0);
  const [rowsPerPagePublications, setRowsPerPagePublications] =
    React.useState(10);

  const handleChangePageTeachers = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageTeachers(newPage);
  };

  const handleChangePagePublications = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagePublications(newPage);
  };

  const handleChangeRowsPerPageTeachers = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPageTeachers(parseInt(event.target.value, 10));
    setPageTeachers(0);
  };

  const handleChangeRowsPerPagePublications = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPagePublications(parseInt(event.target.value, 10));
    setPagePublications(0);
  };

  async function getDepartmentById() {
    setLoadingDepartment(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/departments/${id}`
      );
      setDepartment(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDepartment(false);
    }
  }

  async function getAndSearchTeachersOfDepartment() {
    setLoadingTeachersOfDepartment(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/teachers?departmentId=${id}&_page=${pageTeachers + 1}&_per_page=${rowsPerPageTeachers}`
      );
      setTeachersOfDepartment(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTeachersOfDepartment(false);
    }
  }

  async function getAndSearchPublicationsOfDepartment() {
    setLoadingPublicationsOfDepartment(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications?departmentId=${id}&_page=${pagePublications + 1}&_per_page=${rowsPerPagePublications}`
      );
      setPublicationsOfDepartment(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPublicationsOfDepartment(false);
    }
  }

  useEffect(() => {
    getDepartmentById();
  }, []);

  useEffect(() => {
    getAndSearchTeachersOfDepartment();
  }, [valueTeachers, pageTeachers, rowsPerPageTeachers]);

  useEffect(() => {
    getAndSearchPublicationsOfDepartment();
  }, [valuePublications, pagePublications, rowsPerPagePublications]);

  return (
    <>
      <div className="department_component dark:bg-[#091220] duration-300">
        <div className="block_department_component py-5 px-5 max-w-6xl mx-auto">
          {loadingDepartment ? (
            <div>
              <h1 className="dark:text-white">Loading...</h1>
            </div>
          ) : (
            <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
              <div className="faculty_block_1_img">
                <img
                  src={department.departmentImg}
                  alt=""
                  className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px] object-cover object-center"
                />
              </div>
              <div className="faculty_block_2">
                <h1 className="font-bold text-2xl text-center dark:text-white duration-300">
                  {department.departmentName}
                </h1>
                <p className="max-w-md text-justify dark:text-white duration-300">
                  {department.about}
                </p>
                <h2 className="mt-3 dark:text-white duration-300">
                  Year of opening:{" "}
                  <span className="font-bold">{department.yearOfOpening}</span>{" "}
                  years
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Head of the department:{" "}
                  <span className="font-bold">
                    {department.headOfDepartment}
                  </span>
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Amount of the teachers in this department:{" "}
                  <span className="font-bold">
                    {teachersOfDepartment.items || 0}
                  </span>{" "}
                  teachers
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Amount of the publications in this department:{" "}
                  <span className="font-bold">
                    {publicationsOfDepartment.items || 0}
                  </span>{" "}
                  publications
                </h2>
              </div>
            </div>
          )}

          <div className="block_of_teachers_of_this_faculty mt-12">
            <h1 className="text-center text-3xl dark:text-white duration-300">
              Founded{" "}
              <span className="font-bold">
                {teachersOfDepartment.items || 0}
              </span>{" "}
              teachers in the department of{" "}
              <span className="font-bold">{department.departmentName}</span>
            </h1>
            <div className="for_search_and_filter">
              <div className="for_input w-1/2 mx-auto mt-2">
                <Input
                  value={valueTeachers}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValueTeachers(event.target.value);
                  }}
                  type="search"
                  label="Search the teachers"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                  className="dark:text-white"
                />
              </div>
            </div>
            <div className="teacher_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
              {loadingTeachersOfDepartment ? (
                <h1 className="dark:text-white">...Loading</h1>
              ) : teachersOfDepartment?.data?.length ? (
                teachersOfDepartment.data
                  .filter((item: any) =>
                    item.teacherName
                      .toLowerCase()
                      .includes(valueTeachers.trim().toLowerCase())
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
                teacherImg={teacherImg}
                teacherName={`Taghoev Shamsullo`}
                teacherJobLevel={`muallimi kalon`}
              />
              <EachTeacher
                teacherImg={teacherImg}
                teacherName={`Taghoev Shamsullo`}
                teacherJobLevel={`muallimi kalon`}
              />
              <EachTeacher
                teacherImg={teacherImg}
                teacherName={`Taghoev Shamsullo`}
                teacherJobLevel={`muallimi kalon`}
              />
              <EachTeacher
                teacherImg={teacherImg}
                teacherName={`Taghoev Shamsullo`}
                teacherJobLevel={`muallimi kalon`}
              /> */}
            </div>
            <div className="for_pagionation_of_teachers flex justify-center dark:bg-white mt-6">
              <TablePagination
                component="div"
                count={teachersOfDepartment.items || 0}
                page={pageTeachers}
                onPageChange={handleChangePageTeachers}
                rowsPerPage={rowsPerPageTeachers}
                onRowsPerPageChange={handleChangeRowsPerPageTeachers}
              />
            </div>
          </div>
          <div className="block_of_publications_of_this_department mt-12">
            <h1 className="text-center text-3xl dark:text-white duration-300">
              Founded{" "}
              <span className="font-bold">
                {publicationsOfDepartment.items || 0}
              </span>{" "}
              publications in the department of{" "}
              <span className="font-bold">{department.departmentName}</span>
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
              {loadingPublicationsOfDepartment ? (
                <h1 className="dark:text-white">...Loading</h1>
              ) : publicationsOfDepartment?.data?.length ? (
                publicationsOfDepartment.data
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
            <div className="for_pagination_of_publications flex justify-center dark:bg-white mt-6">
              <TablePagination
                component="div"
                count={publicationsOfDepartment.items || 0}
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

export default Department;
