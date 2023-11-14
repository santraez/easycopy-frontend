import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { CreateItemPage } from "../pages/CreateItemPage";
import { ReadItemPage } from "../pages/ReadItemPage";
import { StartItemPage } from "../pages/StartItemPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartItemPage />} />
        <Route path="/save" element={<CreateItemPage />} />
        <Route path="/open/:seedKey" element={<ReadItemPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
