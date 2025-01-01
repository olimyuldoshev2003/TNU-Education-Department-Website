import { Link } from "react-router-dom";

const EachFaculty = ({
  facultyImg,
  facultyName,
}: {
  facultyImg: string;
  facultyName: string;
}) => {
  return (
    <>
      <Link to={``} className="each_faculty_component">
        <div
          className="hospitals relative w-[max-content] cursor-pointer hover:scale-105 duration-200"
          // key={item.slug}
        >
          <img
            src={facultyImg}
            className="w-[230px] h-[290px] rounded-[10px]"
            alt=""
          />
          <h1 className="absolute bottom-[14%] text-[#fff] left-[17px] text-[29px] font-[500]">
            {facultyName}
          </h1>
        </div>
      </Link>
    </>
  );
};

export default EachFaculty;
