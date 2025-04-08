import { Link } from "react-router-dom";

const EachTeacher = ({
  id,
  teacherImg,
  teacherName,
  teacherJobLevel,
}: {
  id: number;
  teacherImg: string;
  teacherName: string;
  teacherJobLevel: string;
}) => {
  return (
    <>
      <Link
        to={`/teacher/${id}`}
        className="each_teacher_component hover:scale-105 duration-200"
      >
        <div
          className="relative w-[max-content] cursor-pointer"
          // key={item.slug}
        >
          <img
            src={teacherImg}
            className="w-[230px] h-[290px] rounded-[10px]"
            alt=""
          />
        </div>
        <div className="text_block mt-3">
          <h1 className="text-[18px] font-[500] text-center dark:text-white duration-300">
            {teacherName}
          </h1>
          <h1 className="text-[16px] font-[500] text-center dark:text-white duration-300">
            {teacherJobLevel}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default EachTeacher;
