import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface Publication {
  id: string;
  publicationName: string;
  about: string;
  publicationImg: string;
  publicatedYear: number;
  amountOfPages: number;
  facultyId: string;
  thisPublicationPlaced: string;
  author?: string;
}

interface Faculty {
  id: string;
  facultyName: string;
}

const Publication = () => {
  const { id } = useParams();

  const { t } = useTranslation();

  // Loading and error states
  const [loadingPublication, setLoadingPublication] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data
  const [publication, setPublication] = useState<any>(null);
  const [facultyOfPublication, setFacultyOfPublication] =
    useState<Faculty | null>(null);
  const [authorOfPublication, setAuthorOfPublication] = useState<any>(null);

  async function getPublicationById() {
    setLoadingPublication(true);
    setError(null);
    try {
      const { data } = await axios.get<Publication>(
        `http://localhost:3000/publications/${id}`
      );
      setPublication(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load publication data");
    } finally {
      setLoadingPublication(false);
    }
  }

  async function getFacultyByFacultyIdOfPublication(facultyId: string) {
    try {
      const { data } = await axios.get<Faculty>(
        `http://localhost:3000/faculties/${facultyId}`
      );

      setFacultyOfPublication(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load faculty data");
    }
  }

  async function getAuthorByTeacherIdOfPublication(teacherId: string) {
    try {
      const { data } = await axios.get<Faculty>(
        `http://localhost:3000/teachers/${teacherId}`
      );

      setAuthorOfPublication(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load faculty data");
    }
  }

  useEffect(() => {
    getPublicationById();
  }, [id]);

  useEffect(() => {
    if (publication?.facultyId) {
      getFacultyByFacultyIdOfPublication(publication?.facultyId);
    }
  }, [publication?.facultyId]);

  useEffect(() => {
    if (publication?.teacherId) {
      getAuthorByTeacherIdOfPublication(publication?.teacherId);
    }
  }, [publication?.teacherId]);

  if (error) {
    return <div className="p-5 text-red-500 dark:text-red-400">{error}</div>;
  }

  if (loadingPublication || !publication) {
    return (
      <div className="p-5">
        <h1 className="dark:text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="publication_component dark:bg-[#091220] duration-300">
      <div className="block_faculty_component py-5 px-5 max-w-6xl mx-auto duration-300">
        <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
          <div className="faculty_block_1_img">
            <img
              src={publication.publicationImg}
              alt={publication.publicationName}
              className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px] object-cover object-center"
            />
          </div>
          <div className="faculty_block_2">
            <h1 className="font-bold text-2xl text-center dark:text-white duration-300">
              {publication.publicationName}
            </h1>
            <p className="max-w-md text-justify dark:text-white duration-300">
              {publication.about}
            </p>
            <h2 className="mt-3 dark:text-white duration-300">
              {t("publication.t1")}:{" "}
              <span className="font-bold">
                {authorOfPublication?.teacherName || "Unknown"}
              </span>
            </h2>
            <h2 className="mt-3 dark:text-white duration-300">
              {t("publication.t2")}:{" "}
              <span className="font-bold">{publication.publicatedYear}</span>{" "}
              {t("publication.t3")}
            </h2>
            <h2 className="mt-3 dark:text-white duration-300 mr-1">
              {t("publication.t4")}:{" "}
              <span className="font-bold">{publication.amountOfPages}</span>{" "}
              {t("publication.t5")}
            </h2>
            <h2 className="mt-3 dark:text-white duration-300 mr-1">
              {t("publication.t6")}:{" "}
              {facultyOfPublication ? (
                <Link
                  to={`/faculty/${facultyOfPublication.id}`}
                  className="font-bold"
                >
                  {facultyOfPublication.facultyName}
                </Link>
              ) : (
                <span className="font-bold">Loading faculty...</span>
              )}
            </h2>
            <h2 className="mt-3 dark:text-white duration-300">
              {t("publication.t7")}:{" "}
              {publication.thisPublicationPlaced ? (
                <a
                  href={
                    publication.thisPublicationPlaced.startsWith("http")
                      ? publication.thisPublicationPlaced
                      : `https://${publication.thisPublicationPlaced}`
                  }
                  className="font-bold hover:text-[red] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publication.thisPublicationPlaced}
                </a>
              ) : (
                <span className="font-bold">Not available online</span>
              )}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publication;
