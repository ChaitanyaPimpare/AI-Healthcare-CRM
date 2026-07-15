import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import LogInteraction from "../pages/LogInteraction";
import History from "../pages/History";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/log-interaction"
          element={<LogInteraction />}
        />

        <Route
          path="/history"
          element={<History />}
        />

      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}