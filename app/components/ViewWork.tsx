// app/view-work/page.tsx (or components/ViewWork.tsx)
"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import Navbar from "../pages/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CircularGallery from "../../components/CircularGallery";

// ---------- Configuration (same as before) ----------
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "catering", label: "Catering" },
  { key: "real-estate", label: "Real Estate" },
  { key: "interior-design", label: "Interior Design" },
  { key: "clinic", label: "Clinic" },
  { key: "hospital", label: "Hospital" },
  { key: "e-commerce", label: "E-Commerce" },
  { key: "business-profile", label: "Business Profile" },
];

const TECH_STACKS = ["All", "React", "Next.js", "HTML"];

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "title", label: "Name: A → Z" },
];

const ITEMS_PER_PAGE = 6;

// ---------- SWR fetcher ----------
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ViewWork() {
  const router = useRouter();

  // ---------- State (filters, sort, page) ----------
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTech, setSelectedTech] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Build API query string ----------
  const queryParams = new URLSearchParams({
    category: selectedCategory,
    tech: selectedTech,
    search: searchQuery,
    sort: sortBy,
    page: String(currentPage),
    limit: String(ITEMS_PER_PAGE),
  });

  const { data, error, isLoading } = useSWR(
    `/api/projects?${queryParams.toString()}`,
    fetcher
  );

  // ---------- Derived data ----------
  const projects = data?.data || [];
  const pagination = data?.pagination || { total: 0, totalPages: 1 };
  const totalPages = pagination.totalPages;

  // ---------- Active filter chips (same as before) ----------
  const activeFilters = [];
  if (selectedCategory !== "all") {
    const label = CATEGORIES.find((c) => c.key === selectedCategory)?.label;
    activeFilters.push({ type: "category", label: `Category: ${label}` });
  }
  if (selectedTech !== "All") {
    activeFilters.push({ type: "tech", label: `Tech: ${selectedTech}` });
  }
  if (searchQuery.trim() !== "") {
    activeFilters.push({ type: "search", label: `Search: "${searchQuery}"` });
  }

  // ---------- Helpers ----------
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTech("All");
    setSortBy("default");
    setCurrentPage(1);
  };

  const removeFilter = (type: string) => {
    if (type === "category") setSelectedCategory("all");
    if (type === "tech") setSelectedTech("All");
    if (type === "search") setSearchQuery("");
    setCurrentPage(1);
  };

  // ---------- Gallery click handler (uses fetched projects) ----------
  const handleGalleryItemClick = (index: number, data: { image: string; text: string }) => {
    // Find project by title (text)
    const project = projects.find((p: any) => p.title === data.text);
    if (project) {
      router.push(`/projects/${project.slug}`);
    }
  };

  // ---------- Render ----------
  return (
    <div>
      <div className="mb-24">
        <Navbar />
      </div>

      {/* Circular Gallery (unchanged) */}
      

      {/* ---------- FILTER & SORT SECTION ---------- */}
      <section className="py-6 bg-gray-50 border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          {/* Row 1: Search + Clear All */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

           
          </div>

          {/* Row 2: Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-1">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Row 3: Tech Filter + Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 mr-1">Tech:</span>
              {TECH_STACKS.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    setSelectedTech(tech);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    selectedTech === tech
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-50"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-sm border border-gray-300 rounded-full px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 4: Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-200">
              {activeFilters.map((filter, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full"
                >
                  {filter.label}
                  <button
                    onClick={() => removeFilter(filter.type)}
                    className="hover:text-indigo-900 font-bold ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <span className="text-xs text-gray-400 ml-1">
                ({pagination.total} results)
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ---------- PROJECT GRID ---------- */}
      <section id="portfolio" className="py-12 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">Failed to load projects. Please try again.</p>
            </div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No projects match your filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-indigo-600 underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}

          {!isLoading && !error && projects.length > 0 && (
            <>
              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project: any, index: number) => (
                  <Card key={project.slug} project={project} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-gray-300 hover:bg-indigo-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

// ---------- CARD COMPONENT (unchanged) ----------
function Card({ project, index }: any) {
  return (
    <Link href={`/projects/${encodeURIComponent(project.slug)}`} className="block h-full min-w-0">
      <div
        className="flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white shadow-md transition-all duration-300 group-hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-fadeInUp"
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
      >
        <div className="h-56 shrink-0 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/400x300/6C63FF/FFFFFF?text=Project+Image";
            }}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">
              {project.tech}
            </span>
            <span className="text-green-600 text-sm font-semibold">
              {project.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-600">
            {project.desc.replace(/\*\*/g, "").replace(/\s+[*-]\s+/g, " ")}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3">
            <span className="font-semibold text-indigo-600">{project.price}</span>
            <span className="text-indigo-600 font-semibold group-hover:underline">
              View Project →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}