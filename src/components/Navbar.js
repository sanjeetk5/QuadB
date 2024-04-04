import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { auth } = useSelector((store) => store.authReducer);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <Container maxWidth="2xl">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,

              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              //   border: '1px solid',
              //   borderColor: 'divider',
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link to={"/"}>
                <img
                  src={
                    "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                  }
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Link to={"/task"} sx={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="text.primary">
                      Tasks
                    </Typography>
                  </Link>
                </MenuItem>

                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Link to={"/usertask"} sx={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="text.primary">
                      All Task
                    </Typography>
                  </Link>
                </MenuItem>
              </Box>
            </Box>

            {auth ? (
              <>
                <Profile />
              </>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/signin"
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  href="signup"
                >
                  Sign up
                </Button>
              </Box>
            )}
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                  </Box>
                  <Link to={"/task"} sx={{ textDecoration: "none" }}>
                    <MenuItem>Task</MenuItem>
                  </Link>
                  <Link to={"/usertask"} sx={{ textDecoration: "none" }}>
                    <MenuItem>All Task</MenuItem>
                  </Link>

                  <Divider />
                  {auth ? (
                    <>
                     <Link to={"/task"} >
                     <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          
                          sx={{ width: "100%" }}
                        >
                          Get Started
                        </Button>
                      </MenuItem>
                     </Link>
                    </>
                  ) : (
                   <Link to={"/signin"} >
                    <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      
                      sx={{ width: "100%" }}
                    >
                      Sign In
                    </Button>
                  </MenuItem>
                   </Link>
                
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;
