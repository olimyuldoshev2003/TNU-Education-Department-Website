//Images
import { Link } from "react-router-dom";
import teacherImg from "../../assets/bg-image.jpg";

const Teacher = () => {
  return (
    <>
      <div className="teacher_component dark:bg-[#091220] duration-300">
        <div className="block_teacher_component py-5 px-5 max-w-6xl mx-auto">
          <div className="main_block_of_teacher flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
            <div className="teacher_block_1_img">
              <img
                src={teacherImg}
                alt=""
                className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px]"
              />
            </div>
            <div className="teacher_block_2">
              <h1 className="font-bold text-2xl text-center dark:text-white duration-300">
                Taghoev Shamsullo
              </h1>
              <p className="max-w-md text-justify dark:text-white duration-300">
                voluptatem ex iure necessitatibus molestias dolorum, voluptas
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
                assumenda explicabo repellat eius exercitationem asperiores unde
                facere esse distinctio aperiam laudantium tempore deserunt?
              </p>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                Date of birth:{" "}
                <span className="font-normal">12. 12. 1980 years</span>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                Works in faculty:{" "}
                <Link
                  to={`/faculty`}
                  className="font-normal hover:underline hover:text-red-500"
                >
                  Mechanic and Math
                </Link>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                Works in department:{" "}
                <Link
                  to={`/department`}
                  className="font-normal hover:underline hover:text-red-500"
                >
                  Informatics
                </Link>
              </h2>
              <h2 className="mt-3 font-bold dark:text-white duration-300">
                The year Taghoev Shamsullo joined to this faculty:{" "}
                <span className="font-normal">2010 years</span>
              </h2>
              {/*
            <h2 className="mt-3 font-bold">
            Number of Departments:{" "}
            <span className="font-normal">About 100 departments</span>
            </h2>
            <h2 className="mt-3 font-bold">
            Number of Teachers:{" "}
              <span className="font-normal">About 100 teachers</span>
            </h2>
            <h2 className="mt-3 font-bold">
              Number of Publications:{" "}
              <span className="font-normal">About 200 publications</span>
            </h2> */}
            </div>
          </div>
          <div className="block_of_departments_of_this_faculty"></div>
          {/* <div className="block_of_teachers_of_this_faculty mt-7">
          <h1 className="text-center text-3xl font-bold">
            Founded <span>100</span> teachers in the faculty of{" "}
            <span>Mechanic and Math</span>
          </h1>
          <div className="teacher_of_this_faculty flex flex-wrap justify-center gap-3 mt-5">
            <EachTeacher
            teacherImg={teacherImg}
            teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
              />
              <EachTeacher
              teacherImg={teacherImg}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={teacherImg}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={teacherImg}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={teacherImg}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
            teacherImg={teacherImg}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Teacher;
