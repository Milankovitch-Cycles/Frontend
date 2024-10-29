import * as React from "react";
import PropTypes from "prop-types";
import { extendTheme } from "@mui/material/styles";
import TimelineIcon from "@mui/icons-material/Timeline";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ListWells from "../ListWells/ListWells";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux"; 
import { removeAuthToken } from '../../redux/states';
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "listWells",
    title: "Pozos",
    icon: <TimelineIcon />,
  }, 
  {
    segment: "listProccess", // TO-DO: Change this
    title: "Procesamientos",
    icon: <ArticleIcon />, // TO-DO: Change this
  },
  {
    segment: "user", // TO-DO: Change this
    title: "Mi cuenta",
    icon: <PersonIcon />, // TO-DO: Change this
  },
  {
    segment: "logout",
    title: "Cerrar Sesión",
    icon: <LogoutIcon />,
  },
  // TO-DO: Add sign out
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname, demoFunction }) {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth?.access_token);
  if (pathname === "llego el dato") {
    console.log("fue llamada desde list Wells");
  }
  if (pathname === "/listWells") {

    if (!authToken) {
      window.location.href = '/login';
      return null;
    }
    return <ListWells demoFunction={DemoPageContent} pathname={pathname} />;
  } else if (pathname === "/logout") {
  
    dispatch(removeAuthToken());
    window.location.href = '/login';
  }
  return <ListWells demoFunction={DemoPageContent} pathname={pathname} />;
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  demoFunction: PropTypes.func.isRequired, // Añadimos la validación para demoFunction
};;

function AppProviderTheme(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  // Define la función demoFunction
  const demoFunction = () => {
    console.log("Función demo llamada desde ListWells");
  };

  return (
    <AppProvider
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "My App",
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} demoFunction={demoFunction} />
      </DashboardLayout>
    </AppProvider>
  );
}

AppProviderTheme.propTypes = {
  window: PropTypes.func,
};

export default AppProviderTheme;
