import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

//Components
import EachDepartment from "../../components/eachDepartment/EachDepartment";
import EachFaculty from "../../components/eachFaculty/EachFaculty";
import EachTeacher from "../../components/eachTeacher/EachTeacher";

//Images
// import facultyImage from "../../assets/bg-image.jpg";
import { useTranslation } from "react-i18next";
import EachPublication from "../../components/eachPublication/EachPublication";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  getDepartmentsHomePage,
  getFacultiesHomePage,
  getPublicationsHomePage,
  getTeachersHomePage,
} from "../../api/api";

const Home = () => {
  //for translation
  const { t } = useTranslation();

  // Redux Toolkit
  //Dispatch
  const dispatch = useAppDispatch();

  //States from redux
  // Home page
  const loadingFacultiesHome = useAppSelector(
    (state) => state.states.loadingFacultiesHome
  );
  const facultiesHome = useAppSelector((state) => state.states.facultiesHome);
  const loadingDepartmentsHome = useAppSelector(
    (state) => state.states.loadingDepartmentsHome
  );

  const departmentsHome = useAppSelector(
    (state) => state.states.departmentsHome
  );
  const loadingTeachersHome = useAppSelector(
    (state) => state.states.loadingTeachersHome
  );
  const teachersHome = useAppSelector((state) => state.states.teachersHome);
  const loadingPublicationsHome = useAppSelector(
    (state) => state.states.loadingPublicationsHome
  );
  const publicationsHome = useAppSelector(
    (state) => state.states.publicationsHome
  );

  // Out of home page
  // const loadingFaculties = useAppSelector(
  //   (state) => state.states.loadingFaculties
  // );
  // const faculties = useAppSelector((state) => state.states.faculties);

  // const loadingDepartments = useAppSelector(
  //   (state) => state.states.loadingDepartments
  // );

  // const departments = useAppSelector(
  //   (state) => state.states.departments
  // );

  // const loadingTeachers = useAppSelector(
  //   (state) => state.states.loadingTeachers
  // );
  // const teachers = useAppSelector((state) => state.states.teachers);

  // const loadingPublications = useAppSelector(
  //   (state) => state.states.loadingPublications
  // );
  // const publications = useAppSelector(
  //   (state) => state.states.publications
  // );

  // Run the database
  useEffect(() => {
    dispatch(getFacultiesHomePage());
    dispatch(getDepartmentsHomePage());
    dispatch(getTeachersHomePage());
    dispatch(getPublicationsHomePage());
  }, [dispatch]);
  return (
    <>
      <div className="home_component py-7 dark:bg-[#091220] duration-300">
        <section className="faculties mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("home.s1.t1")}
          </h1>
          <div className="block_of_faculties flex flex-wrap justify-center gap-3 mt-5">
            {loadingFacultiesHome === false && facultiesHome?.length !== 0 ? (
              facultiesHome?.map((item: any) => {
                return (
                  <EachFaculty
                    id={item.id}
                    key={item.id}
                    facultyImg={item.facultyImg}
                    facultyName={item.facultyName}
                  />
                );
              })
            ) : loadingFacultiesHome === true && facultiesHome?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingFacultiesHome === false && facultiesHome?.length === 0) ||
              (loadingFacultiesHome === false &&
                facultiesHome === undefined && (
                  <h1 className="dark:text-white">Faculties not found</h1>
                ))
            )}
            {/* <EachFaculty
              facultyImg={facultyImage}
              facultyName={`Mechanich and Mathematics`}
            />
            <EachFaculty facultyImg={facultyImage} facultyName={`Rights`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Physics`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} /> */}
          </div>
          <Link
            to={`/faculties`}
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
        <section className="departments mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("home.s2.t1")}
          </h1>
          <div className="block_of_departments text-center mt-5 flex flex-col gap-3 px-4">
            {loadingDepartmentsHome === false &&
            departmentsHome?.length !== 0 ? (
              departmentsHome?.map((item: any) => {
                return (
                  <EachDepartment
                    key={item.id}
                    id={item.id}
                    department={item.departmentName}
                  />
                );
              })
            ) : loadingDepartmentsHome === true &&
              departmentsHome?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingDepartmentsHome === false &&
                departmentsHome?.length === 0) ||
              (loadingDepartmentsHome === false &&
                departmentsHome === undefined && (
                  <h1 className="dark:text-white">Departments not found</h1>
                ))
            )}
            {/* <EachDepartment department={`Modeling`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} /> */}
          </div>
          <Link
            to={`/departments`}
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
        <section className="teachers mt-8">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("home.s3.t1")}
          </h1>
          <div className="block_of_teachers flex flex-wrap justify-center gap-3 mt-5">
            {loadingTeachersHome === false && teachersHome?.length !== 0 ? (
              teachersHome?.map((item: any) => {
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
            ) : loadingTeachersHome === true && teachersHome?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingTeachersHome === false && teachersHome?.length === 0) ||
              (loadingTeachersHome === false && teachersHome === undefined && (
                <h1 className="dark:text-white">Teachers not found</h1>
              ))
            )}
            {/* <EachTeacher
              teacherImg={teacherImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={teacherImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={teacherImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={teacherImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            /> */}
          </div>
          <Link
            to={`/teachers`}
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
        <section className="publications mt-8">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("home.s4.t1")}
          </h1>
          <div className="block_of_publications flex flex-wrap justify-center gap-3 mt-5">
            {loadingPublicationsHome === false &&
            publicationsHome?.length !== 0 ? (
              publicationsHome?.map((item: any) => {
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
            ) : loadingPublicationsHome === true &&
              publicationsHome?.length === 0 ? (
              <h1 className="dark:text-white">...Loading</h1>
            ) : (
              (loadingPublicationsHome === false &&
                publicationsHome?.length === 0) ||
              (loadingPublicationsHome === false &&
                publicationsHome === undefined && (
                  <h1 className="dark:text-white">Teachers not found</h1>
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
            /> */}
          </div>
          <Link
            to={`/publications`}
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
    </>
  );
};

export default Home;
