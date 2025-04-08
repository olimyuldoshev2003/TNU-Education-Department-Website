//Images
import { Link } from "react-router-dom";
import logoFooter from "../../assets/logo_tnu.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  //for translation
  const { t } = useTranslation();

  return (
    <>
      <footer className="footer_component bg-[#060057]">
        <div className="footer_container max-w-6xl mx-auto py-3">
          <div className="footer_block_1 flex justify-center items-center gap-4 px-3 flex-wrap">
            <div className="image_text flex justify-center items-center gap-4">
              <img src={logoFooter} alt="" className="logo w-16 rounded-full" />
              <div className="block_about_tnu flex flex-col gap-1">
                <h1 className="text-white text-4xl">{t("f.t1")}</h1>
                <p className="max-w-md text-sm text-white">{t("f.t2")}</p>
              </div>
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <h3 className="text-[gray]">{t("f.t3")}</h3>
              </li>
              <li className="mt-1">
                <Link to={`/`} className="text-white hover:underline">
                  {t("h.t1")}
                </Link>
              </li>
              <li>
                <Link to={`/faculties`} className="text-white hover:underline">
                  {t("h.t2")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/departments`}
                  className="text-white hover:underline"
                >
                  {t("h.t3")}
                </Link>
              </li>
              <li>
                <Link to={`/teachers`} className="text-white hover:underline">
                  {t("h.t4")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/publications`}
                  className="text-white hover:underline"
                >
                  {t("h.t5")}
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="footer_block_2">
            <h1></h1>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
