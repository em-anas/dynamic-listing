import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/index.css";
import { ThemeProvider } from "styled-components";
import { MainLayout } from "./components/Layouts";
import { BrandsPage } from "./pages/BrandsPage";
import { MobilesPage } from "./pages/MobilesPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={{ mode: "light" }}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<BrandsPage />} />
            <Route path="mobiles" element={<MobilesPage />} />
            <Route path="mobiles/:brandId" element={<MobilesPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
