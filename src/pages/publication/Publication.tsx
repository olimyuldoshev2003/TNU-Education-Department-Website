// Images
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Publication = () => {
  const { id } = useParams();

  // Loading
  const [loadingPublication, setLoadingPublication] = useState(false);

  // Data
  const [publication, setPublication] = useState<any>([]);

  const [facultyOfPublication, setFacultyOfPublication] = useState<any>([]);

  async function getPublicationById() {
    setLoadingPublication(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/publications/${id}`
      );
      setPublication(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPublication(false);
    }
  }

  async function getFacultyByFacultyIdOfPublication() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/faculties/${publication.facultyId}`
      );
      setFacultyOfPublication(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPublicationById();
  }, []);

  useEffect(() => {
    getFacultyByFacultyIdOfPublication();
  }, []);

  return (
    <>
      <div className="publication_component dark:bg-[#091220] duration-300">
        <div className="block_faculty_component py-5 px-5 max-w-6xl mx-auto duration-300">
          {loadingPublication ? (
            <div>
              <h1 className="dark:text-white">Loading...</h1>
            </div>
          ) : (
            <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
              <div className="faculty_block_1_img">
                <img
                  src={publication.publicationImg}
                  alt=""
                  className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px]"
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
                  Author: <span className="font-bold">Taghoev Shamsullo</span>
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  Year of publication:{" "}
                  <span className="font-bold">
                    {publication.publicatedYear}
                  </span>{" "}
                  years
                </h2>
                <h2 className="mt-3 dark:text-white duration-300 mr-1">
                  Amount of pages:{" "}
                  <span className="font-bold">{publication.amountOfPages}</span>{" "}
                  pages
                </h2>
                <h2 className="mt-3 dark:text-white duration-300 mr-1">
                  Wrote in faculty:{" "}
                  <Link
                    to={`/faculty/${facultyOfPublication.id}`}
                    className="font-bold"
                  >
                    {facultyOfPublication.facultyName}
                  </Link>
                </h2>
                <h2 className="mt-3 dark:text-white duration-300">
                  You can find this book here:{" "}
                  <Link
                    to={`${publication.thisPublicationPlaced}`}
                    className="font-bold hover:text-[red] hover:underline"
                  >
                    {publication.thisPublicationPlaced}
                  </Link>
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Publication;
