import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Chip, Button } from "@mui/material"; 

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "listarPozos",
    title: "Listar Pozos",
    icon: <DashboardIcon />,
    action: (handleNavigation) => (
      <Button
        onClick={() => handleNavigation("listarPozos")}
      >
        Listar
      </Button>
    ),
  },
  {
    segment: "cargarPozos",
    title: "Cargar Pozos",
    icon: <ShoppingCartIcon />,
    action: (handleNavigation) => (
      <Button
        onClick={() => handleNavigation("cargarPozos")}
       
      >
        Cargar
      </Button>
    ),
  },
  {
    segment: "/loadWell",
    title: "Prueba carga pozo",
    icon: <ShoppingCartIcon />
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function Sidebar(props) {
  const { window, children, onNavigate } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window ? window() : undefined;

  // Función para manejar la navegación
  const handleNavigation = (segment) => {
    console.log("Navigating to:", segment);
    if (onNavigate) {
      onNavigate(segment);
    }
  };

  // Modifica la navegación para incluir la función handleNavigation
  const navigationWithHandlers = NAVIGATION.map((item) => ({
    ...item,
    action: item.action ? item.action(handleNavigation) : undefined, // Llama a la acción pasando handleNavigation
  }));

  return (
    <AppProvider
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "My App",
      }}
      navigation={navigationWithHandlers} // Usa la navegación con handlers
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}
