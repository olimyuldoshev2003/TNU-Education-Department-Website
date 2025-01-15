import { Link } from "react-router-dom"

const EachDepartment = ({department}:{department: string}) => {
  return (
      <>
      <Link to={`/department`}>
          <div className="each_department_component shadow-md py-4 px-2 rounded-md hover:scale-[1.02] duration-300 text-[gray] hover:text-red-500 bg-[#e4e4e4]">
            <h1 className="text-center">{department}</h1>
          </div>
      </Link>
      </>
  )
}

export default EachDepartment