import EachTeacher from "../../components/eachTeacher/EachTeacher";

//Images
import facultyImage from "../../assets/bg-image.jpg";

const Teachers = () => {
  return (
    <>
      <div className="teachers_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_teachers_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            Founded 1000 teachers
          </h1>
          <div className="block_of_teachers flex flex-wrap justify-center gap-3 mt-5">
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
            <EachTeacher
              teacherImg={facultyImage}
              teacherName={`Taghoev Shamsullo`}
              teacherJobLevel={`muallimi kalon`}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Teachers;
