import EachTeacher from "../../components/eachTeacher/EachTeacher";

//Images
import facultyImg from "../../assets/bg-image.jpg";
import teacherImg from "../../assets/bg-image.jpg";

const Faculty = () => {
  return (
    <>
      <div className="faculty_component py-5 px-5 max-w-6xl mx-auto">
        <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
          <div className="faculty_block_1_img">
            <img
              src={facultyImg}
              alt=""
              className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px]"
            />
          </div>
          <div className="faculty_block_2">
            <h1 className="font-bold text-2xl text-center">
              Mechanic and Math
            </h1>
            <p className="max-w-md text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
              voluptatem ex iure necessitatibus molestias dolorum, voluptas
              assumenda explicabo repellat eius exercitationem asperiores unde
              facere esse distinctio aperiam laudantium tempore deserunt?
            </p>
            <h2 className="mt-3 font-bold">
              Year of opening: <span className="font-normal">1990 years.</span>
            </h2>
            <h2 className="mt-3 font-bold">
              Dean: <span className="font-normal">Qosimov I. L.</span>
            </h2>
            <h2 className="mt-3 font-bold">
              Number of students:{" "}
              <span className="font-normal">About 1200 students</span>
            </h2>
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
            </h2>
          </div>
        </div>
        <div className="block_of_departments_of_this_faculty"></div>
        <div className="block_of_teachers_of_this_faculty mt-7">
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
        </div>
      </div>
    </>
  );
};

export default Faculty;
