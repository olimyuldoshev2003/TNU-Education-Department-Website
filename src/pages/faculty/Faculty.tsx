import EachDepartment from "../../components/eachDepartment/EachDepartment";
import EachPublication from "../../components/eachPublication/EachPublication";
import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import EachTeacher from "../../components/eachTeacher/EachTeacher";
import { useTranslation } from "react-i18next";

interface FacultyData {
  facultyImg: string;
  facultyName: string;
  about: string;
  yearOfOpening: string;
  dean: string;
  students: number;
}

interface Department {
  id: string;
  departmentName: string;
}

interface Teacher {
  id: string;
  teacherImg: string;
  teacherName: string;
  teacherJobLevel: string;
}

interface Publication {
  id: string;
  publicationImg: string;
  publicationName: string;
}

interface PaginatedResponse<T> {
  data: T[];
  items: number;
}

const Faculty = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  // Loading states
  const [loadingFaculty, setLoadingFaculty] = useState(false);
  const [loadingDepartmentsOfFaculty, setLoadingDepartmentsOfFaculty] =
    useState(false);
  const [loadingTeachersOfFaculty, setLoadingTeachersOfFaculty] =
    useState(false);
  const [loadingPublicationsOfFaculty, setLoadingPublicationsOfFaculty] =
    useState(false);

  // Data states
  const [faculty, setFaculty] = useState<FacultyData | null>(null);
  const [departmentsOfFaculty, setDepartmentsOfFaculty] = useState<
    PaginatedResponse<Department>
  >({ data: [], items: 0 });
  const [teachersOfFaculty, setTeachersOfFaculty] = useState<
    PaginatedResponse<Teacher>
  >({ data: [], items: 0 });
  const [publicationsOfFaculty, setPublicationsOfFaculty] = useState<
    PaginatedResponse<Publication>
  >({ data: [], items: 0 });

  // Search states
  const [valueDepartments, setValueDepartments] = useState("");
  const [valueTeachers, setValueTeachers] = useState("");
  const [valuePublications, setValuePublications] = useState("");

  // Pagination states
  const [pageDepartments, setPageDepartments] = useState(0);
  const [rowsPerPageDepartments, setRowsPerPageDepartments] = useState(10);
  const [pageTeachers, setPageTeachers] = useState(0);
  const [rowsPerPageTeachers, setRowsPerPageTeachers] = useState(10);
  const [pagePublications, setPagePublications] = useState(0);
  const [rowsPerPagePublications, setRowsPerPagePublications] = useState(10);

  // Data fetching functions
  const getFacultyById = async () => {
    setLoadingFaculty(true);
    try {
      const { data } = await axios.get<FacultyData>(
        `http://localhost:3000/faculties/${id}`
      );
      setFaculty(data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoadingFaculty(false);
    }
  };

  const getAndSearchDepartmentsOfFaculty = async () => {
    setLoadingDepartmentsOfFaculty(true);
    try {
      const { data } = await axios.get<PaginatedResponse<Department>>(
        `http://localhost:3000/departments?facultyId=${id}&_page=${
          pageDepartments + 1
        }&_per_page=${rowsPerPageDepartments}`
      );
      setDepartmentsOfFaculty(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoadingDepartmentsOfFaculty(false);
    }
  };

  const getAndSearchTeachersOfFaculty = async () => {
    setLoadingTeachersOfFaculty(true);
    try {
      const { data } = await axios.get<PaginatedResponse<Teacher>>(
        `http://localhost:3000/teachers?facultyId=${id}&_page=${
          pageTeachers + 1
        }&_per_page=${rowsPerPageTeachers}`
      );
      setTeachersOfFaculty(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachersOfFaculty(false);
    }
  };

  const getAndSearchPublicationsOfFaculty = async () => {
    setLoadingPublicationsOfFaculty(true);
    try {
      const { data } = await axios.get<PaginatedResponse<Publication>>(
        `http://localhost:3000/publications?facultyId=${id}&_page=${
          pagePublications + 1
        }&_per_page=${rowsPerPagePublications}`
      );
      setPublicationsOfFaculty(data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoadingPublicationsOfFaculty(false);
    }
  };

  // Pagination handlers
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

  useEffect(() => {
    getFacultyById();
  }, [id]);

  useEffect(() => {
    getAndSearchDepartmentsOfFaculty();
  }, [id, valueDepartments, pageDepartments, rowsPerPageDepartments]);

  useEffect(() => {
    getAndSearchTeachersOfFaculty();
  }, [id, valueTeachers, pageTeachers, rowsPerPageTeachers]);

  useEffect(() => {
    getAndSearchPublicationsOfFaculty();
  }, [id, valuePublications, pagePublications, rowsPerPagePublications]);

  const filteredDepartments = departmentsOfFaculty.data.filter((item) =>
    item.departmentName
      .toLowerCase()
      .includes(valueDepartments.trim().toLowerCase())
  );

  const filteredTeachers = teachersOfFaculty.data.filter((item) =>
    item.teacherName.toLowerCase().includes(valueTeachers.trim().toLowerCase())
  );

  const filteredPublications = publicationsOfFaculty.data.filter((item) =>
    item.publicationName
      .toLowerCase()
      .includes(valuePublications.trim().toLowerCase())
  );

  return (
    <div className="faculty_component dark:bg-[#091220] duration-300 min-h-screen">
      <div className="block_faculty_component py-5 px-5 max-w-6xl mx-auto duration-300">
        {/* Faculty Info Section */}
        {loadingFaculty ? (
          <h1 className="dark:text-white text-center duration-300">
            Loading faculty data...
          </h1>
        ) : faculty ? (
          <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2 duration-300">
            <div className="faculty_block_1_img">
              <img
                src={faculty.facultyImg}
                alt={faculty.facultyName}
                className="md:w-[330px] h-[390px] sm:w-full rounded-[10px] object-cover object-center duration-300"
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
                {t("faculty.t1")}:{" "}
                <span className="font-bold">{faculty.yearOfOpening}</span>{" "}
                {t("faculty.t2")}
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("faculty.t3")}:{" "}
                <span className="font-bold">{faculty.dean}</span>
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("faculty.t4")}:{" "}
                <span className="font-bold">{faculty.students}</span>{" "}
                {t("faculty.t5")}
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("faculty.t6")}:{" "}
                <span className="font-bold">
                  {departmentsOfFaculty.items || 0}
                </span>{" "}
                {t("faculty.t7")}
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("faculty.t8")}:{" "}
                <span className="font-bold">
                  {teachersOfFaculty.items || 0}
                </span>{" "}
                {t("faculty.t9")}
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("faculty.t10")}:{" "}
                <span className="font-bold">
                  {publicationsOfFaculty.items || 0}
                </span>{" "}
                {t("faculty.t11")}
              </h2>
            </div>
          </div>
        ) : (
          <h1 className="dark:text-white text-center duration-300">
            Faculty not found.
          </h1>
        )}

        {/* Departments Section */}
        <div className="block_of_departments_of_this_faculty mt-12 duration-300">
          <h1 className="text-center text-3xl dark:text-white duration-300">
            {t("faculty.t12")}{" "}
            <span className="font-bold">{departmentsOfFaculty.items || 0}</span>{" "}
            {t("faculty.t13")}{" "}
            <span className="font-bold">{faculty?.facultyName}</span>
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={valueDepartments}
                onChange={(e) => setValueDepartments(e.target.value)}
                type="search"
                label={"Search the departments"}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                className="dark:text-white duration-300"
              />
            </div>
          </div>

          {loadingDepartmentsOfFaculty ? (
            <h1 className="dark:text-white text-center duration-300">
              Loading departments...
            </h1>
          ) : filteredDepartments.length ? (
            <div className="block_of_departments mt-5 flex flex-col gap-3 px-4 duration-300">
              {filteredDepartments.map((item: any) => (
                <EachDepartment
                  id={item.id}
                  key={item.id}
                  department={item.departmentName}
                />
              ))}
            </div>
          ) : (
            <h1 className="dark:text-white text-center duration-300">
              {t("noDepartmentsFound") || "Departments not found"}
            </h1>
          )}
          <div className="for_pagionation_of_departments flex justify-center dark:bg-white mt-6 rounded-lg duration-300">
            <TablePagination
              component="div"
              count={departmentsOfFaculty.items || 0}
              page={pageDepartments}
              onPageChange={handleChangePageDepartments}
              rowsPerPage={rowsPerPageDepartments}
              onRowsPerPageChange={handleChangeRowsPerPageDepartments}
            />
          </div>
        </div>

        {/* Teachers Section */}
        <div className="block_of_teachers_of_this_faculty mt-12 duration-300">
          <h1 className="text-center text-3xl dark:text-white duration-300">
            {t("faculty.t12")}{" "}
            <span className="font-bold">{teachersOfFaculty.items || 0}</span>{" "}
            {t("faculty.t14")}{" "}
            <span className="font-bold">{faculty?.facultyName}</span>
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={valueTeachers}
                onChange={(e) => setValueTeachers(e.target.value)}
                type="search"
                label={"Search the teachers"}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                className="dark:text-white duration-300"
              />
            </div>
          </div>

          {loadingTeachersOfFaculty ? (
            <h1 className="dark:text-white text-center duration-300">
              Loading teachers...
            </h1>
          ) : filteredTeachers.length ? (
            <div className="teacher_of_this_faculty flex flex-wrap justify-center gap-3 mt-5 duration-300">
              {filteredTeachers.map((item: any) => (
                <EachTeacher
                  id={item.id}
                  key={item.id}
                  teacherImg={item.teacherImg}
                  teacherName={item.teacherName}
                  teacherJobLevel={item.teacherJobLevel}
                />
              ))}
            </div>
          ) : (
            <h1 className="dark:text-white duration-300 text-center">
              {t("noTeachersFound") || "Teachers not found"}
            </h1>
          )}
          <div className="for_pagionation_of_teachers flex justify-center dark:bg-white mt-6 rounded-lg duration-300">
            <TablePagination
              component="div"
              count={teachersOfFaculty.items || 0}
              page={pageTeachers}
              onPageChange={handleChangePageTeachers}
              rowsPerPage={rowsPerPageTeachers}
              onRowsPerPageChange={handleChangeRowsPerPageTeachers}
            />
          </div>
        </div>

        {/* Publications Section */}
        <div className="block_of_publications_of_this_faculty mt-12 duration-300">
          <h1 className="text-center text-3xl dark:text-white duration-300">
            {t("faculty.t12")}{" "}
            <span className="font-bold">
              {publicationsOfFaculty.items || 0}
            </span>{" "}
            {t("faculty.t15")}{" "}
            <span className="font-bold">{faculty?.facultyName}</span>
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={valuePublications}
                onChange={(e) => setValuePublications(e.target.value)}
                type="search"
                label={"Search the publications"}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                className="dark:text-white duration-300"
              />
            </div>
          </div>

          {loadingPublicationsOfFaculty ? (
            <h1 className="dark:text-white text-center duration-300">
              Loading publications...
            </h1>
          ) : filteredPublications.length ? (
            <div className="publications_of_this_faculty flex flex-wrap justify-center gap-3 mt-5 duration-300">
              {filteredPublications.map((item: any) => (
                <EachPublication
                  id={item.id}
                  key={item.id}
                  publicationImg={item.publicationImg}
                  publicationName={item.publicationName}
                />
              ))}
            </div>
          ) : (
            <h1 className="dark:text-white duration-300 text-center">
              {t("noPublicationsFound") || "Publications not found"}
            </h1>
          )}
          <div className="for_pagionation_of_publications flex justify-center dark:bg-white mt-6 rounded-lg duration-300">
            <TablePagination
              component="div"
              count={publicationsOfFaculty.items || 0}
              page={pagePublications}
              onPageChange={handleChangePagePublications}
              rowsPerPage={rowsPerPagePublications}
              onRowsPerPageChange={handleChangeRowsPerPagePublications}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty;
