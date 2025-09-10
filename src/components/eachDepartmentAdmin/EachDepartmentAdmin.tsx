const EachDepartmentAdmin = ({
  departmentName,
}: {
  departmentName: string;
}) => {
  return (
    <>
        <div className="each_department_component shadow-md py-4 px-2 rounded-md hover:scale-[1.02] duration-300 text-[gray] hover:text-red-500 bg-[#e4e4e4] w-[100%] cursor-pointer">
          <h1 className="text-center">{departmentName}</h1>
        </div>
    </>
  );
};

export default EachDepartmentAdmin;
