
//Images
import departmentImg from "../../assets/bg-image.jpg"

const Department = () => {
  return (
    <>
    <div className="department_component py-5 px-5 max-w-6xl mx-auto">
    <div className="main_block_of_faculty flex md:justify-between sm:justify-center sm:flex-wrap md:flex-nowrap gap-2">
          <div className="faculty_block_1_img">
            <img
              src={departmentImg}
              alt=""
              className="md:w-[330px] h-[390px] sm:w-[100%] rounded-[10px]"
            />
          </div>
          <div className="faculty_block_2">
            <h1 className="font-bold text-2xl text-center">
              Informatics
            </h1>
            <p className="max-w-md text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
              voluptatem ex iure necessitatibus molestias dolorum, voluptas
              assumenda explicabo repellat eius exercitationem asperiores unde
              facere esse distinctio aperiam laudantium tempore deserunt?
            </p>
            <h2 className="mt-3 font-bold">
              Year of opening: <span className="font-normal">1990 years.</span>
            </h2>
            <h2 className="mt-3 font-bold">
              Dean: <span className="font-normal">Qosimov I. L.</span>
            </h2>
            <h2 className="mt-3 font-bold">
              Number of students:{" "}
              <span className="font-normal">About 1200 students</span>
            </h2>
        
            <h2 className="mt-3 font-bold">
              Number of Teachers:{" "}
              <span className="font-normal">About 100 teachers</span>
            </h2>
            <h2 className="mt-3 font-bold">
              Number of Publications:{" "}
              <span className="font-normal">About 200 publications</span>
            </h2>
          </div>
        </div>
    </div>
    </>
  )
}

export default Department