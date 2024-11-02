import * as React from "react";
import PropTypes from "prop-types";
import { extendTheme } from "@mui/material/styles";
import TimelineIcon from "@mui/icons-material/Timeline";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthToken } from '../../redux/states';
import ListWells from "../ListWells/ListWells";

// Constants
const ROUTES = {
  HOME: "/home",
  LIST_WELLS: "/listWells",
  LOGOUT: "/logout",
  LOGIN: "/login",
  LISTPROCESS: "/listProcess",
};

const NAVIGATION = [
  { kind: "header", title: "Secciones" },
  { segment: "home", title: "Pozos", icon: <TimelineIcon /> },
  { segment: "listProcess", title: "Procesamientos", icon: <ArticleIcon /> },
  { segment: "user", title: "Mi cuenta", icon: <PersonIcon /> },
  { segment: "logout", title: "Cerrar Sesión", icon: <LogoutIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function DemoPageContent({ pathname }) {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authToken?.access_token);
  
  React.useEffect(() => {
    if (!authToken) {
      window.location.href = ROUTES.LOGIN;
    }
  }, [authToken]);

  if (pathname === ROUTES.HOME) {
      return <ListWells/>;
  }
  if (pathname === ROUTES.LOGOUT) {
      dispatch(removeAuthToken());
      window.location.href = ROUTES.LOGIN;
      return null;
  } else {
    return <ListWells />;
  }



}


function AppProviderTheme() {
  const router = useDemoRouter();
  return (
    <AppProvider
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Data Wells",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

AppProviderTheme.propTypes = {
  window: PropTypes.func,
};

export default AppProviderTheme;