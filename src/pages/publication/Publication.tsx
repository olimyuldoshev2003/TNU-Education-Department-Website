// Images
import { Link } from "react-router-dom";
import facultyImg from "../../assets/bg-image.jpg";

const Publication = () => {
  return (
    <>
      <div className="publication_component dark:bg-[#091220] duration-300">
        <div className="block_faculty_component py-5 px-5 max-w-6xl mx-auto duration-300">
          <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
            <div className="faculty_block_1_img">
              <img
                src={facultyImg}
                alt=""
                className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px]"
              />
            </div>
            <div className="faculty_block_2">
              <h1 className="font-bold text-2xl text-center dark:text-white duration-300">
                Analityc Model
              </h1>
              <p className="max-w-md text-justify dark:text-white duration-300">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                voluptatem ex iure necessitatibus molestias dolorum, voluptas
                assumenda explicabo repellat eius exercitationem asperiores unde
                facere esse distinctio aperiam laudantium tempore deserunt?
              </p>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                Authors:{" "}
                <span className="font-normal">
                  Taghoev Shamsullo, Fayzali Komilov, Saidzoda Isroil
                </span>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                Year of publication: <span className="font-normal">2020</span>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300 mr-1">
                Number of pages: <span className="font-normal">202 pages</span>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                You can find this book here:{" "}
                <Link
                  to={``}
                  className="font-normal hover:text-[red] hover:underline"
                >
                  www.google.com
                </Link>
              </h2>
              {/*<h2 className="mt-3 font-bold dark:text-white duration-300">
                Number of Teachers:{" "}
                <span className="font-normal">About 100 teachers</span>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                Number of Publications:{" "}
                <span className="font-normal">About 200 publications</span>
              </h2> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
