import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
//Images
import logoHeader from "../assets/logo_tnu.png";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import { Option, Select } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

const drawerWidth = 210;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const Dashboard = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  //for translation
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const pages = [
    {
      id: 1,
      path: "/admin/faculties_admin",
      name: "Faculties",
    },
    {
      id: 2,
      path: "/admin/departments_admin",
      name: "Departments",
    },
    {
      id: 3,
      path: "/admin/teachers_admin",
      name: "Teachers",
    },
    {
      id: 4,
      path: "/admin/publications_admin",
      name: "Publications",
    },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar className="py-2 flex justify-between">
        <Link to={`/admin`} className="">
          <img
            src={logoHeader}
            alt=""
            className="logo w-14 rounded-full"
            onClick={() => {
              setMobileOpen(false);
            }}
          />
        </Link>
        <Button
          sx={{
            display: { xs: "inline", sm: "none" },
          }}
          onClick={() => {
            setMobileOpen(false);
          }}
        >
          <CloseIcon />
        </Button>
      </Toolbar>
      <Divider />
      <List className="">
        {pages.map((text) => (
          <Link
            to={text.path}
            className="block"
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            <ListItem key={text.id} disablePadding className="">
              <ListItemButton className="">
                {/* <ListItemIcon> */}
                {/* </ListItemIcon> */}
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <div className="for_translation mt-6 ">
        <Select
          size="md"
          label={t("h.t6")}
          className=""
          value={i18n.language}
          onChange={(value: string | undefined) => {
            if (value) {
              changeLanguage(value);
            }
          }}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Option value="en">{t("h.t7")}</Option>
          <Option value="ru">{t("h.t8")} </Option>
          <Option value="tj"> {t("h.t9")}</Option>
        </Select>
      </div>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        color="success"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
