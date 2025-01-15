import EachDepartment from "../../components/eachDepartment/EachDepartment"

const Departments = () => {
  return (
    <>
      <section className="departments mt-8 max-w-6xl mx-auto py-6">
          <h1 className="text-center text-3xl font-bold">Founded 1000 departments</h1>
          <div className="block_of_departments mt-5 flex flex-col gap-3 px-4">
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
            <EachDepartment department={`Informatics`}/>
          </div>
        </section>
    </>
  )
}

export default Departments