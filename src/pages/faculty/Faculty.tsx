//Images
import EachDepartment from "../../components/eachDepartment/EachDepartment";
import EachPublication from "../../components/eachPublication/EachPublication";
import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import EachTeacher from "../../components/eachTeacher/EachTeacher";

const Faculty = () => {
  const { id } = useParams();

  // Loading
  const [loadingFaculty, setLoadingFaculty] = useState(false);
  const [loadingDepartmentsOfFaculty, setLoadingDepartmentsOfFaculty] =
    useState(false);
  const [loadingTeachersOfFaculty, setLoadingTeachersOfFaculty] =
    useState(false);
  const [loadingPublicationsOfFaculty, setLoadingPublicationsOfFaculty] =
    useState(false);

  // Data
  const [faculty, setFaculty] = useState<any>([]);
  const [departmentsOfFaculty, setDepartmentsOfFaculty] = useState<any>([]);
  const [teachersOfFaculty, setTeachersOfFaculty] = useState<any>([]);
  const [publicationsOfFaculty, setPublicationsOfFaculty] = useState<any>([]);

  // Search
  const [valueDepartments, setValueDepartments] = useState("");
  const [valueTeachers, setValueTeachers] = useState("");
  const [valuePublications, setValuePublications] = useState("");

  //Pagination
  const [pageDepartments, setPageDepartments] = React.useState(0);
  const [rowsPerPageDepartments, setRowsPerPageDepartments] =
    React.useState(10);

  const [pageTeachers, setPageTeachers] = React.useState(0);
  const [rowsPerPageTeachers, setRowsPerPageTeachers] = React.useState(10);

  const [pagePublications, setPagePublications] = React.useState(0);
  const [rowsPerPagePublications, setRowsPerPagePublications] =
    React.useState(10);

  const handleChangePageDepartments = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageDepartments(newPage);
  };

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

  const handleChangeRowsPerPageDepartments = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPageDepartments(parseInt(event.target.value, 10));
    setPageDepartments(0);
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

  // Async Function
  async function getFacultyById() {
    setLoadingFaculty(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/faculties/${id}`);
      setFaculty(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFaculty(false);
    }
  }

  async function getAndSearchDepartmentsOfFaculty() {
    setLoadingDepartmentsOfFaculty(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/departments?facultyId=${id}&_page=${pageDepartments + 1}&_per_page=${rowsPerPageDepartments}`
      );
      setDepartmentsOfFaculty(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDepartmentsOfFaculty(false);
    }
  }

  async function getAndSearchTeachersOfFaculty() {
    setLoadingTeachersOfFaculty(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/teachers?facultyId=${id}&_page=${pageTeachers + 1}&_per_page=${rowsPerPageTeachers}`
      );
      setTeachersOfFaculty(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTeachersOfFaculty(false);
    }
  }

  async function getAndSearchPublicationsOfFaculty() {
    setLoadingPublicationsOfFaculty(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications?facultyId=${id}&_page=${pagePublications + 1}&_per_page=${rowsPerPagePublications}`
      );
      setPublicationsOfFaculty(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPublicationsOfFaculty(true);
    }
  }

  useEffect(() => {
    getFacultyById();
  }, []);

  useEffect(() => {
    getAndSearchDepartmentsOfFaculty();
  }, [valueDepartments, pageDepartments, rowsPerPageDepartments]);

  useEffect(() => {
    getAndSearchTeachersOfFaculty();
  }, [valueTeachers, pageTeachers, rowsPerPageTeachers]);

  useEffect(() => {
    getAndSearchPublicationsOfFaculty();
  }, [valuePublications, pagePublications, rowsPerPagePublications]);

  return (
    <>
      <div className="faculty_component dark:bg-[#091220] duration-300">
        <div className="block_faculty_component py-5 px-5 max-w-6xl mx-auto duration-300">
          {loadingFaculty ? (
            <div>
              <h1 className="text-center dark:text-white">Loading...</h1>
            </div>
          ) : (
            <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
              <div className="faculty_block_1_img">
                <img
                  src={faculty.facultyImg}
                  alt=""
                  className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px]"
                />
              </div>
              <div className="faculty_block_2">
                <h1 className="font-bold text-2xl text-center dark:text-white duration-300">
                  {faculty.facultyName}
                </h1>
                <p className="max-w-md text-justify dark:text-white duration-300">
                  {faculty.about}
                </p>
                <h2 className="mt-3 dark:text-white duration-300">
                  Year of opening:{" "}
                  <span className="font-bold">{faculty.yearOfOpening}</span>{" "}
                  years
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Dean: <span className="font-bold">{faculty.dean}</span>
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Amount of students:{" "}
                  <span className="font-bold">{faculty.students}</span> students
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Amount of departments:{" "}
                  <span className="font-bold">
                    {departmentsOfFaculty.items}
                  </span>{" "}
                  departments
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Amount of teachers:{" "}
                  <span className="font-bold">{teachersOfFaculty.items}</span>{" "}
                  teachers
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Amount of publications:{" "}
                  <span className="font-bold">
                    {publicationsOfFaculty.items}
                  </span>{" "}
                  publications
                </h2>
              </div>
            </div>
          )}
          <div className="block_of_departments_of_this_faculty mt-12">
            <h1 className="text-center text-3xl dark:text-white duration-300">
              Founded{" "}
              <span className="font-bold">{departmentsOfFaculty.items}</span>{" "}
              departments in the faculty of{" "}
              <span className="font-bold">{faculty.facultyName}</span>
            </h1>
            <div className="for_search_and_filter">
              <div className="for_input w-1/2 mx-auto mt-2">
                <Input
                  value={valueDepartments}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValueDepartments(event.target.value);
                  }}
                  className="dark:text-white"
                  type="search"
                  label="Search the departments"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>

            <div className="block_of_departments mt-5 flex flex-col gap-3 px-4">
              {loadingDepartmentsOfFaculty === false &&
              departmentsOfFaculty?.data?.length !== 0 ? (
                departmentsOfFaculty?.data
                  ?.filter((item: any) => {
                    return item.departmentName
                      .toLowerCase()
                      .includes(valueDepartments.trim().toLowerCase());
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
              ) : loadingDepartmentsOfFaculty === true &&
                departmentsOfFaculty?.data?.length === 0 ? (
                <h1 className="dark:text-white">...Loading</h1>
              ) : (
                (loadingDepartmentsOfFaculty === false &&
                  departmentsOfFaculty?.data?.length === 0) ||
                (loadingDepartmentsOfFaculty === false &&
                  departmentsOfFaculty === undefined && (
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
                count={departmentsOfFaculty.items}
                page={pageDepartments}
                onPageChange={handleChangePageDepartments}
                rowsPerPage={rowsPerPageDepartments}
                onRowsPerPageChange={handleChangeRowsPerPageDepartments}
              />
            </div>
          </div>
          <div className="block_of_teachers_of_this_faculty mt-12">
            <h1 className="text-center text-3xl dark:text-white duration-300">
              Founded{" "}
              <span className="font-bold">{teachersOfFaculty.items}</span>{" "}
              teachers in the faculty of{" "}
              <span className="font-bold">{faculty.facultyName}</span>
            </h1>
            <div className="for_search_and_filter">
              <div className="for_input w-1/2 mx-auto mt-2">
                <Input
                  value={valueTeachers}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValueTeachers(event.target.value);
                  }}
                  className="dark:text-white"
                  type="search"
                  label="Search the teachers"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>
            <div className="teacher_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
              {loadingTeachersOfFaculty === false &&
              teachersOfFaculty?.data?.length !== 0 ? (
                teachersOfFaculty?.data
                  ?.filter((item: any) => {
                    return item.teacherName
                      .toLowerCase()
                      .includes(valueTeachers.trim().toLowerCase());
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
              ) : loadingTeachersOfFaculty === true &&
                teachersOfFaculty?.data?.length === 0 ? (
                <h1 className="dark:text-white">...Loading</h1>
              ) : (
                (loadingTeachersOfFaculty === false &&
                  teachersOfFaculty?.data?.length === 0) ||
                (loadingTeachersOfFaculty === false &&
                  teachersOfFaculty === undefined && (
                    <h1 className="dark:text-white">Departments not found</h1>
                  ))
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
                count={teachersOfFaculty.items}
                page={pageTeachers}
                onPageChange={handleChangePageTeachers}
                rowsPerPage={rowsPerPageTeachers}
                onRowsPerPageChange={handleChangeRowsPerPageTeachers}
              />
            </div>
          </div>
          <div className="block_of_publications_of_this_faculty mt-12">
            <h1 className="text-center text-3xl dark:text-white duration-300">
              Founded{" "}
              <span className="font-bold">{publicationsOfFaculty.items}</span>{" "}
              publications in the faculty of{" "}
              <span className="font-bold">{faculty.facultyName}</span>
            </h1>
            <div className="for_search_and_filter">
              <div className="for_input w-1/2 mx-auto mt-2">
                <Input
                  value={valuePublications}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValuePublications(event.target.value);
                  }}
                  className="dark:text-white"
                  type="search"
                  label="Search the publications"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>
            <div className="publications_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
              {loadingPublicationsOfFaculty === false &&
              publicationsOfFaculty?.data?.length !== 0 ? (
                publicationsOfFaculty?.data
                  ?.filter((item: any) => {
                    return item.publicationName
                      .toLowerCase()
                      .includes(valuePublications.trim().toLowerCase());
                  })
                  .map((item: any) => {
                    return (
                      <EachPublication
                        publicationImg={item.publicationImg}
                        publicationName={item.publicationName}
                        publicationAuthor={item.publicationAuthor}
                      />
                    );
                  })
              ) : loadingPublicationsOfFaculty === true &&
                publicationsOfFaculty?.data?.length === 0 ? (
                <h1 className="dark:text-white">...Loading</h1>
              ) : (
                (loadingPublicationsOfFaculty === false &&
                  publicationsOfFaculty?.data?.length === 0) ||
                (loadingPublicationsOfFaculty === false &&
                  publicationsOfFaculty === undefined && (
                    <h1 className="dark:text-white">publications not found</h1>
                  ))
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
                count={publicationsOfFaculty.items}
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

export default Faculty;
