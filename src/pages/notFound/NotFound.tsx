import { Button } from "@material-tailwind/react";
import notFoundGif from "../../assets/404_not_found/not_found_image.gif";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="not_found_component bg-black min-h-[100vh]">
        <div className="not_found_component_block max-w-6xl mx-auto flex flex-col justify-center items-center">
          <img src={notFoundGif} alt="" />
          <Link to={`/`}>
            <Button
              variant="gradient"
              color="green"
              className="outline-none"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
