import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const DepartmentsAdmin = () => {
  const { t } = useTranslation();

  const [modalAddDepartment, setModalAddDepartment] = useState<boolean>(false);
  const [modalEditDepartment, setModalEditDepartment] =
    useState<boolean>(false);
  const [modalDeleteDepartment, setModalDeleteDepartment] =
    useState<boolean>(false);

  function handleCloseModalAddDepartment() {
    setModalAddDepartment(false);
  }
  return (
    <>
      <div className="departments_admin_component max-w-6xl mx-auto">
        <section className="section_1_departments_admin flex justify-between">
          <h1>
            {t("faculties.t1")} {36} {t("faculties.t2")}
          </h1>
          <AddIcon
            sx={{
              cursor: "pointer",
              fontSize: "29px",
            }}
            onClick={() => {
              setModalAddDepartment(true);
            }}
          />
        </section>

        {/* Modal Add Department */}
        <Dialog
          open={modalAddDepartment}
          onClose={handleCloseModalAddDepartment}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="block_modal_add_department">
            <form action="">
              <DialogTitle id="alert-dialog-title">
                {"Add Department"}
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCloseModalAddDepartment}
                >
                  Close
                </Button>
                <Button variant="contained" color="success" fullWidth type="submit" autoFocus>
                  Add
                </Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default DepartmentsAdmin;
