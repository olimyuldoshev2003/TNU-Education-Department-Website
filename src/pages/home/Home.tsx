import EachDepartment from "../../components/eachDepartment/EachDepartment";
import EachFaculty from "../../components/eachFaculty/EachFaculty";
import EachTeacher from "../../components/eachTeacher/EachTeacher";

//Iamges
import facultyImage from "../../assets/bg-image.jpg"
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Home = () => {
  return (
    <>
      <div className="home_component py-7">
        <section className="faculties mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold">Faculties</h1>
          <div className="block_of_faculties flex flex-wrap justify-center gap-3 mt-5">
            <EachFaculty facultyImg={facultyImage} facultyName={`Biology`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Mechanich and Mathematics`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Rights`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Physics`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
          </div>
          <Link to={`/faculties`} className="flex justify-center mt-7">
            <Button color="green" variant="gradient">See All of Faculties</Button>
          </Link>
        </section>
        <section className="departments mt-4">
          <h1 className="text-center text-3xl font-bold">Departments</h1>
          <div className="block_of_departments">
            <EachDepartment />
          </div>
        </section>
        <section className="teachers mt-4">
          <h1 className="text-center text-3xl font-bold">Teachers</h1>
          <div className="block_of_teachers">
            <EachTeacher />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
