import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from "@mui/icons-material/History";

export default function Sidebar() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      name: "Log Interaction",
      path: "/log-interaction",
      icon: <ChatIcon />,
    },
    {
      name: "History",
      path: "/history",
      icon: <HistoryIcon />,
    },
  ];

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 250,
        transition: "0.3s",
        background: "#1E293B",
        color: "#fff",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        {!collapsed && (
          <Typography variant="h5" fontWeight={700}>
            AI CRM
          </Typography>
        )}

        <IconButton
          sx={{ color: "#fff" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              minHeight: 52,
              justifyContent: collapsed ? "center" : "flex-start",
              "&.Mui-selected": {
                background: "#2563EB",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: collapsed ? 0 : 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            {!collapsed && (
              <ListItemText primary={item.name} />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}