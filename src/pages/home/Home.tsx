import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// Components
import EachDepartment from "../../components/eachDepartment/EachDepartment";
import EachFaculty from "../../components/eachFaculty/EachFaculty";
import EachTeacher from "../../components/eachTeacher/EachTeacher";
import EachPublication from "../../components/eachPublication/EachPublication";

// Hooks
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

// API
import {
  getDepartmentsHomePage,
  getFacultiesHomePage,
  getPublicationsHomePage,
  getTeachersHomePage,
} from "../../api/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

// Types
interface Faculty {
  id: string;
  facultyImg: string;
  facultyName: string;
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
  publicationAuthor: string;
}

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // States from Redux
  const loadingFacultiesHome = useAppSelector(
    (state: any) => state.states.loadingFacultiesHome
  );
  const facultiesHome = useAppSelector(
    (state: any) => state.states.facultiesHome
  );

  const loadingDepartmentsHome = useAppSelector(
    (state: any) => state.states.loadingDepartmentsHome
  );
  const departmentsHome = useAppSelector(
    (state: any) => state.states.departmentsHome
  );

  const loadingTeachersHome = useAppSelector(
    (state: any) => state.states.loadingTeachersHome
  );
  const teachersHome = useAppSelector(
    (state: any) => state.states.teachersHome
  );

  const loadingPublicationsHome = useAppSelector(
    (state: any) => state.states.loadingPublicationsHome
  );
  const publicationsHome = useAppSelector(
    (state: any) => state.states.publicationsHome
  );

  useEffect(() => {
    dispatch(getFacultiesHomePage());
    dispatch(getDepartmentsHomePage());
    dispatch(getTeachersHomePage());
    dispatch(getPublicationsHomePage());
  }, [dispatch]);

  return (
    <div className="home_component py-7 dark:bg-[#091220] duration-300">
      {/* Faculties Section */}
      <section className="faculties mt-8 max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
          {t("home.s1.t1")}
        </h1>
        <div className="block_of_faculties flex flex-wrap justify-center gap-3 mt-5">
          {loadingFacultiesHome ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : facultiesHome?.length ? (
            facultiesHome.map((item: Faculty) => (
              <EachFaculty
                key={item.id}
                id={item.id}
                facultyImg={item.facultyImg}
                facultyName={item.facultyName}
              />
            ))
          ) : (
            <h1 className="dark:text-white">Faculties not found</h1>
          )}
        </div>
        <Link
          to="/faculties"
          className="flex justify-center mt-7 max-w-max mx-auto"
        >
          <Button
            color="green"
            variant="gradient"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t("home.s1.t2")}
          </Button>
        </Link>
      </section>

      {/* Departments Section */}
      <section className="departments mt-8 max-w-6xl mx-auto">
        <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
          {t("home.s2.t1")}
        </h1>
        <div className="block_of_departments text-center mt-5 flex flex-col gap-3 px-4">
          {loadingDepartmentsHome ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : departmentsHome?.length ? (
            departmentsHome.map((item: Department) => (
              <EachDepartment
                key={item.id}
                id={item.id}
                department={item.departmentName}
              />
            ))
          ) : (
            <h1 className="dark:text-white">Departments not found</h1>
          )}
        </div>
        <Link
          to="/departments"
          className="flex justify-center mt-7 max-w-max mx-auto"
        >
          <Button
            color="green"
            variant="gradient"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t("home.s2.t2")}
          </Button>
        </Link>
      </section>

      {/* Teachers Section */}
      <section className="teachers mt-8">
        <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
          {t("home.s3.t1")}
        </h1>
        <div className="block_of_teachers flex flex-wrap justify-center gap-3 mt-5">
          {loadingTeachersHome ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : teachersHome?.length ? (
            teachersHome.map((item: Teacher) => (
              <EachTeacher
                key={item.id}
                id={item.id}
                teacherImg={item.teacherImg}
                teacherName={item.teacherName}
                teacherJobLevel={item.teacherJobLevel}
              />
            ))
          ) : (
            <h1 className="dark:text-white">Teachers not found</h1>
          )}
        </div>
        <Link
          to="/teachers"
          className="flex justify-center mt-7 max-w-max mx-auto"
        >
          <Button
            color="green"
            variant="gradient"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t("home.s3.t2")}
          </Button>
        </Link>
      </section>

      {/* Publications Section */}
      <section className="publications mt-8">
        <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
          {t("home.s4.t1")}
        </h1>
        <div className="block_of_publications flex flex-wrap justify-center gap-3 mt-5">
          {loadingPublicationsHome ? (
            <h1 className="dark:text-white">...Loading</h1>
          ) : publicationsHome?.length ? (
            publicationsHome.map((item: Publication) => (
              <EachPublication
                key={item.id}
                id={item.id}
                publicationImg={item.publicationImg}
                publicationName={item.publicationName}
              />
            ))
          ) : (
            <h1 className="dark:text-white">Publications not found</h1>
          )}
        </div>
        <Link
          to="/publications"
          className="flex justify-center mt-7 max-w-max mx-auto"
        >
          <Button
            color="green"
            variant="gradient"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {t("home.s4.t2")}
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
