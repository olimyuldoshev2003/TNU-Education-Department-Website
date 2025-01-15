import notFoundGif from "../../assets/404_not_found/not_found_image.gif";

const NotFound = () => {
  return (
    <>
      <div className="not_found_component bg-black">
        <div className="not_found_component_block max-w-6xl mx-auto flex justify-center">
          <img src={notFoundGif} alt="" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
