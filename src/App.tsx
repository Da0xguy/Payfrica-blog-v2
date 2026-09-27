/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { ARTICLES } from './data/articles';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F9FA] text-[#111215] flex flex-col font-sans selection:bg-[#C84323]/20 selection:text-[#C84323]">
        {/* Top Floating Pill Navigation */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Global Interactive Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          articles={ARTICLES}
        />

        {/* Page Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
            <Route path="/journal" element={<HomePage onOpenSearch={() => setIsSearchOpen(true)} />} />
            <Route path="/journal/:slug" element={<ArticlePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Brand Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
