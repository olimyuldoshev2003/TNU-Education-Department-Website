import { useTranslation } from "react-i18next";
import EachDepartment from "../../components/eachDepartment/EachDepartment";

const Departments = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="departments_component dark:bg-[#091220] duration-300 py-6">
        <section className="block_departments_component mt-8 max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold dark:text-white duration-300">
            {t("departments.t1")} 1000 {t("departments.t2")}
          </h1>
          <div className="block_of_departments mt-5 flex flex-col gap-3 px-4">
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
            <EachDepartment department={`Informatics`} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Departments;
