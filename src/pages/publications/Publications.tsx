// Images
import { useTranslation } from "react-i18next";
import teacherImage from "../../assets/bg-image.jpg";

import EachPublication from "../../components/eachPublication/EachPublication";

const Publications = () => {
  //for translation
  const { t } = useTranslation();
  return (
    <>
      <div className="publications_component dark:bg-[#091220] duration-300 py-6">
        <section className="publications mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("publications.t1")} 1000 {t("publications.t2")}
          </h1>
          <div className="block_of_publications flex flex-wrap justify-center gap-3 mt-5">
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
            <EachPublication
              publicationImg={teacherImage}
              publicationName={"Rich Dad, Poor Dad"}
              publicationAuthor={"Robert T. Kiyosaki"}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Publications;
