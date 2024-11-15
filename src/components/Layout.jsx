import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, CssBaseline, Avatar, Divider } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch } from "react-redux";
import { removeAuthToken } from '../redux/states';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerExpandToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    if (path === "/logout") {
      dispatch(removeAuthToken());
      navigate("/login");
      return;
    }
    navigate(path);
    setMobileOpen(false);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button onClick={() => handleNavigation("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/wells")}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Pozos" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/jobs")}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Procesamientos" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/account")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Cuenta" />
        </ListItem>
      </List>
      <Divider />
      <List style={{ position: "absolute", bottom: "0", width: "100%" }}>
        <ListItem button onClick={() => handleNavigation("/logout")}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="expand drawer"
              edge="start"
              onClick={handleDrawerExpandToggle}
              sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Cycle App
            </Typography>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerOpen ? drawerWidth : 0 },
          }}
          open={drawerOpen}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <main style={{ flexGrow: 1, padding: '24px', marginTop: '64px', marginLeft: drawerOpen ? drawerWidth : 0, transition: 'margin-left 0.3s' }}>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;