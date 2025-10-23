import { Tabs, Tab, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = (() => {
    if (location.pathname.startsWith("/recommendation")) return 1;
    if (location.pathname.startsWith("/about")) return 2;
    return 0;
  })();

  const handleChange = (e, newValue) => {
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/recommendation");
        break;
      case 2:
        navigate("/about");
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" elevation={1}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <img
              src="/logo192.png"
              alt="Logo"
              style={{ width: 32, height: 32 }}
            /> */}
            <Typography variant="h6" color="white" fontWeight="bold">
              PakarLaptop
            </Typography>
          </Box>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            textColor="white"
            indicatorColor="primary"
            centered
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
              },
            }}
          >
            <Tab label="Home" />
            <Tab label="How It Works" />
            <Tab label="About" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
