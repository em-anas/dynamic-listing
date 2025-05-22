import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { MainLayout } from "./components/Layouts";
import { NotFoundPage, BrandsPage, MobilesPage } from "./pages";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
