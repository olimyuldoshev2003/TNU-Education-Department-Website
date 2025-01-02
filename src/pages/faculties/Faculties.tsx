//Images
import facultyImage from "../../assets/bg-image.jpg";
import EachFaculty from "../../components/eachFaculty/EachFaculty";

const Faculties = () => {
  return (
    <>
      <section className="faculties_component mt-8 max-w-6xl mx-auto py-6">
        <h1 className="text-center text-3xl font-bold">Founded 18 faculties</h1>
        
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
      </section>
    </>
  );
};

export default Faculties;
