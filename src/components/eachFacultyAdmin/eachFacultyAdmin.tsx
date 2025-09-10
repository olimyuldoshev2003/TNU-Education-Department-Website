const EachFacultyAdmin = ({
  facultyImg,
  facultyName,
}: {
  facultyImg: string;
  facultyName: string;
}) => {
  return (
    <>
        <div
          className="relative w-[max-content] cursor-pointer hover:scale-105 duration-200"
        >
          <img
            src={facultyImg}
            className="w-[230px] h-[290px] rounded-[10px] object-cover object-center"
            alt=""
          />
          <h1 className="absolute bottom-[10px] text-[#fff] left-[17px] text-[29px] font-[500]">
            {facultyName}
          </h1>
        </div>
    </>
  );
};

export default EachFacultyAdmin;
