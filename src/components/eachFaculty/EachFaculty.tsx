import { Link } from "react-router-dom";

const EachFaculty = ({
  id,
  facultyImg,
  facultyName,
}: {
  id: string;
  facultyImg: string;
  facultyName: string;
}) => {
  return (
    <>
      <Link to={`/faculty/${id}`} className="each_faculty_component">
        <div
          className="relative w-[max-content] cursor-pointer hover:scale-105 duration-200"
          // key={item.slug}
        >
          <img
            src={facultyImg}
            className="w-[230px] h-[290px] rounded-[10px]"
            alt=""
          />
          <h1 className="absolute bottom-[10px] text-[#fff] left-[17px] text-[29px] font-[500]">
            {facultyName}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default EachFaculty;
