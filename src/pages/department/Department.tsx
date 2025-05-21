import { Input } from "@material-tailwind/react";
import EachTeacher from "../../components/eachTeacher/EachTeacher";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import EachPublication from "../../components/eachPublication/EachPublication";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface DepartmentData {
  departmentImg: string;
  departmentName: string;
  about: string;
  yearOfOpening: string;
  headOfDepartment: string;
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

const Department = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  // Loading states
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [loadingTeachersOfDepartment, setLoadingTeachersOfDepartment] =
    useState(false);
  const [loadingPublicationsOfDepartment, setLoadingPublicationsOfDepartment] =
    useState(false);

  // Data states
  const [department, setDepartment] = useState<DepartmentData | null>(null);
  const [teachersOfDepartment, setTeachersOfDepartment] = useState<
    PaginatedResponse<Teacher>
  >({ data: [], items: 0 });
  const [publicationsOfDepartment, setPublicationsOfDepartment] = useState<
    PaginatedResponse<Publication>
  >({ data: [], items: 0 });

  // Search states
  const [valueTeachers, setValueTeachers] = useState("");
  const [valuePublications, setValuePublications] = useState("");

  // Pagination states
  const [pageTeachers, setPageTeachers] = useState(0);
  const [rowsPerPageTeachers, setRowsPerPageTeachers] = useState(10);
  const [pagePublications, setPagePublications] = useState(0);
  const [rowsPerPagePublications, setRowsPerPagePublications] = useState(10);

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

  const getDepartmentById = async () => {
    setLoadingDepartment(true);
    try {
      const { data } = await axios.get<DepartmentData>(
        `http://localhost:3000/departments/${id}`
      );
      setDepartment(data);
    } catch (error) {
      console.error("Error fetching department:", error);
    } finally {
      setLoadingDepartment(false);
    }
  };

  const getTeachersOfDepartment = async () => {
    setLoadingTeachersOfDepartment(true);
    try {
      const { data } = await axios.get<PaginatedResponse<Teacher>>(
        `http://localhost:3000/teachers?departmentId=${id}&_page=${pageTeachers + 1}&_per_page=${rowsPerPageTeachers}`
      );
      setTeachersOfDepartment(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachersOfDepartment(false);
    }
  };

  const getPublicationsOfDepartment = async () => {
    setLoadingPublicationsOfDepartment(true);
    try {
      const { data } = await axios.get<PaginatedResponse<Publication>>(
        `http://localhost:3000/publications?departmentId=${id}&_page=${pagePublications + 1}&_per_page=${rowsPerPagePublications}`
      );
      setPublicationsOfDepartment(data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoadingPublicationsOfDepartment(false);
    }
  };

  useEffect(() => {
    getDepartmentById();
  }, [id]);

  useEffect(() => {
    getTeachersOfDepartment();
  }, [id, valueTeachers, pageTeachers, rowsPerPageTeachers]);

  useEffect(() => {
    getPublicationsOfDepartment();
  }, [id, valuePublications, pagePublications, rowsPerPagePublications]);

  const filteredTeachers = teachersOfDepartment.data.filter((item) =>
    item.teacherName.toLowerCase().includes(valueTeachers.trim().toLowerCase())
  );

  const filteredPublications = publicationsOfDepartment.data.filter((item) =>
    item.publicationName
      .toLowerCase()
      .includes(valuePublications.trim().toLowerCase())
  );

  if (!department) {
    return <div className="dark:text-white">Loading department data...</div>;
  }

  return (
    <div className="department_component dark:bg-[#091220] duration-300">
      <div className="block_department_component py-5 px-5 max-w-6xl mx-auto duration-300">
        {loadingDepartment ? (
          <div>
            <h1 className="dark:text-white">Loading...</h1>
          </div>
        ) : (
          <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
            <div className="faculty_block_1_img">
              <img
                src={department.departmentImg}
                alt={department.departmentName}
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
                {t("department.t1")}:{" "}
                <span className="font-bold">{department.yearOfOpening}</span>{" "}
                {t("department.t2")}
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("department.t3")}:{" "}
                <span className="font-bold">{department.headOfDepartment}</span>
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("department.t4")}:{" "}
                <span className="font-bold">
                  {teachersOfDepartment.items || 0}
                </span>{" "}
                {t("department.t5")}
              </h2>
              <h2 className="mt-3 dark:text-white duration-300">
                {t("department.t6")}:{" "}
                <span className="font-bold">
                  {publicationsOfDepartment.items || 0}
                </span>{" "}
                {t("department.t7")}
              </h2>
            </div>
          </div>
        )}

        <div className="block_of_teachers_of_this_faculty mt-12">
          <h1 className="text-center text-3xl dark:text-white duration-300">
            {t("department.t8")}{" "}
            <span className="font-bold">{teachersOfDepartment.items || 0}</span>{" "}
            {t("department.t9")}{" "}
            <span className="font-bold">{department.departmentName}</span>
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={valueTeachers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValueTeachers(e.target.value)
                }
                type="search"
                label={t("search.teachers") || "Search the teachers"}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                className="dark:text-white"
              />
            </div>
          </div>
          <div className="teacher_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
            {loadingTeachersOfDepartment ? (
              <h1 className="dark:text-white">Loading teachers...</h1>
            ) : filteredTeachers.length ? (
              filteredTeachers.map((item) => (
                <EachTeacher
                  key={item.id}
                  id={item.id}
                  teacherImg={item.teacherImg}
                  teacherName={item.teacherName}
                  teacherJobLevel={item.teacherJobLevel}
                />
              ))
            ) : (
              <h1 className="dark:text-white">
                {t("noTeachersFound") || "Teachers not found"}
              </h1>
            )}
          </div>
          <div className="for_pagionation_of_teachers flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={teachersOfDepartment.items}
              page={pageTeachers}
              onPageChange={handleChangePageTeachers}
              rowsPerPage={rowsPerPageTeachers}
              onRowsPerPageChange={handleChangeRowsPerPageTeachers}
            />
          </div>
        </div>

        <div className="block_of_publications_of_this_department mt-12">
          <h1 className="text-center text-3xl dark:text-white duration-300">
            {t("department.t8")}{" "}
            <span className="font-bold">
              {publicationsOfDepartment.items || 0}
            </span>{" "}
            {t("department.t10")}{" "}
            <span className="font-bold">{department.departmentName}</span>
          </h1>
          <div className="for_search_and_filter">
            <div className="for_input w-1/2 mx-auto mt-2">
              <Input
                value={valuePublications}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValuePublications(e.target.value)
                }
                type="search"
                label={t("search.publications") || "Search the publications"}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
                className="dark:text-white"
              />
            </div>
          </div>
          <div className="publications_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
            {loadingPublicationsOfDepartment ? (
              <h1 className="dark:text-white">Loading publications...</h1>
            ) : filteredPublications.length ? (
              filteredPublications.map((item) => (
                <EachPublication
                  key={item.id}
                  id={item.id}
                  publicationImg={item.publicationImg}
                  publicationName={item.publicationName}
                />
              ))
            ) : (
              <h1 className="dark:text-white">
                {t("noPublicationsFound") || "Publications not found"}
              </h1>
            )}
          </div>
          <div className="for_pagination_of_publications flex justify-center dark:bg-white mt-6">
            <TablePagination
              component="div"
              count={publicationsOfDepartment.items}
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

export default Department;
