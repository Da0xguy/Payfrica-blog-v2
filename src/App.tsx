/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SearchModal } from "./components/SearchModal";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { CmsPage } from "./pages/CmsPage";
import { postsApi } from "./api";
import { Article } from "./types/article";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isCmsRoute = location.pathname.startsWith("/cms");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isCmsRoute) {
      setLoading(false);
      return;
    }

    const fetchArticles = async () => {
      try {
        const data = await postsApi.getAll();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [isCmsRoute]);

  return (
    <div
      className={`min-h-screen ${isCmsRoute ? "bg-[#f1f2ed] text-[#18211e]" : "bg-[#F8F9FA] text-[#111215]"} flex flex-col font-sans selection:bg-[#C84323]/20 selection:text-[#C84323]`}
    >
      {!isCmsRoute && <Navbar onOpenSearch={() => setIsSearchOpen(true)} />}

      {!isCmsRoute && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          articles={articles}
          loading={loading}
        />
      )}

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenSearch={() => setIsSearchOpen(true)}
                articles={articles}
                loading={loading}
              />
            }
          />
          <Route
            path="/journal"
            element={
              <HomePage
                onOpenSearch={() => setIsSearchOpen(true)}
                articles={articles}
                loading={loading}
              />
            }
          />
          <Route path="/journal/:slug" element={<ArticlePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cms/*" element={<CmsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isCmsRoute && <Footer />}
    </div>
  );
}
