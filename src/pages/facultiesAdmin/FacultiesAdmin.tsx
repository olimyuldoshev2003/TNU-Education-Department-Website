//Material UI
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalAddFaculty from "../../components/modalAddFaculty/ModalAddFaculty";

const FacultiesAdmin = () => {
  const { t } = useTranslation();

  //States
  const [modalAddFaculty, setModalAddFaculty] = useState<boolean>(false);

  return (
    <>
      <div className="faculties_admin_component max-w-6xl mx-auto">
        <div className="block_1_faculties_admin_component flex justify-between">
          <h1>
            {t("faculties.t1")} 18 {t("faculties.t2")}
          </h1>
          <AddIcon
            sx={{
              cursor: "pointer",
              fontSize: "29px",
            }}
            onClick={() => {
              setModalAddFaculty(true);
            }}
          />
        </div>
        <ModalAddFaculty
          modalAddFaculty={modalAddFaculty}
          setModalAddFaculty={setModalAddFaculty}
        />
        <div className="block_2_faculties_admin_component"></div>
      </div>
    </>
  );
};

export default FacultiesAdmin;
