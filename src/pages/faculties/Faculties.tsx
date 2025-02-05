//Images
import { useTranslation } from "react-i18next";
import facultyImage from "../../assets/bg-image.jpg";
import EachFaculty from "../../components/eachFaculty/EachFaculty";

const Faculties = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="faculties_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_faculties_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("faculties.t1")} 18 {t("faculties.t2")}
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
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
            <EachFaculty facultyImg={facultyImage} facultyName={`Math`} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Faculties;
