import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { DealsPage } from './pages/Deals';
import { FreePage } from './pages/Free';
import { PublishPage } from './pages/Publish';
import { TermsPage } from './pages/Terms';
import { PrivacyPage } from './pages/Privacy';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/free" element={<FreePage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>
    </Routes>
  );
}


