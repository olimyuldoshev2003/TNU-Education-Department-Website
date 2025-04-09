import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EachPublication = ({
  id,
  publicationImg,
  publicationName,
}: {
  id: string;
  publicationImg: string;
  publicationName: string;
}) => {
  const [teacherForThisPublication, setTeacherForThisPublication] =
    useState<any>([]);
  console.log(teacherForThisPublication);

  async function getTeacherForThisPublication() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/teachers?publicationId=${id}`
      );
      setTeacherForThisPublication(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTeacherForThisPublication();
  }, []);

  return (
    <>
      <Link
        to={`/publication/${id}`}
        className="each_teacher_component hover:scale-105 duration-200"
      >
        <div
          className="relative w-[max-content] cursor-pointer"
          // key={item.slug}
        >
          <img
            src={publicationImg}
            className="w-[230px] h-[290px] rounded-[10px]"
            alt=""
          />
        </div>
        <div className="text_block mt-3">
          <h1 className="text-[18px] font-[500] text-center dark:text-white duration-300">
            {publicationName}
          </h1>
          {/* <h1 className="text-[16px] font-[500] text-center dark:text-white duration-300">
            {teacherForThisPublication.teacherName}
          </h1> */}
        </div>
      </Link>
    </>
  );
};

export default EachPublication;
