import { Link } from "react-router-dom";

const EachTeacher = ({
  teacherImg,
  teacherName,
  teacherJobLevel,
}: {
  teacherImg: string;
  teacherName: string;
  teacherJobLevel: string;
}) => {
  return (
    <>
      <Link
        to={`/teacher`}
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
        <h1 className="text-[18px] font-[500] text-center">{teacherName}</h1>
        <h1 className="text-[16px] font-[500] text-center">{teacherJobLevel}</h1>
      </Link>
    </>
  );
};

export default EachTeacher;
