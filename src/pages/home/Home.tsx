import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

//Components
import EachDepartment from "../../components/eachDepartment/EachDepartment";
import EachFaculty from "../../components/eachFaculty/EachFaculty";
import EachTeacher from "../../components/eachTeacher/EachTeacher";

//Images
import facultyImage from "../../assets/bg-image.jpg";
import teacherImage from "../../assets/bg-image.jpg";

const Home = () => {
  return (
    <>
      <div className="home_component py-7 dark:bg-[#091220] duration-300">
        <section className="faculties mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            Faculties
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
              See all of faculties
            </Button>
          </Link>
        </section>
        <section className="departments mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            Departments
          </h1>
          <div className="block_of_departments mt-5 flex flex-col gap-3 px-4">
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Modeling`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
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
              See all of departments
            </Button>
          </Link>
        </section>
        <section className="teachers mt-8">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            Teachers
          </h1>
          <div className="block_of_teachers flex flex-wrap justify-center gap-3 mt-5">
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
              See all of teachers
            </Button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
