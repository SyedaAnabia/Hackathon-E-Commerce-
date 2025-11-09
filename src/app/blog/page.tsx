"use client";
import React, { useState } from "react";
import Image from "next/image";

interface BlogPost {
  src: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 3;

  const blogPosts: BlogPost[] = [
    {
      src: "/images/blog1.jpg",
      title: "The Art of Modest Fashion",
      date: "10 Nov 2024",
      category: "Style",
      excerpt:
        "Discover how La Khalaba redefines elegance through timeless modest pieces that celebrate confidence and grace.",
    },
    {
      src: "/images/blog2.jpg",
      title: "Choosing Fabrics that Breathe Luxury",
      date: "25 Oct 2024",
      category: "Design",
      excerpt:
        "A closer look at how fabric selection influences comfort, texture, and the soul of every boutique piece.",
    },
    {
      src: "/images/blog3.jpg",
      title: "The Rise of Contemporary Abayas",
      date: "02 Oct 2024",
      category: "Fashion",
      excerpt:
        "Modern abayas are not just garments—they are statements of identity, comfort, and empowerment.",
    },
    {
      src: "/images/blog4.jpg",
      title: "How to Accessorize with Elegance",
      date: "12 Sep 2024",
      category: "Styling",
      excerpt:
        "Accessories complete your look. Learn how minimal touches can elevate any outfit effortlessly.",
    },
    {
      src: "/images/blog5.jpg",
      title: "Inside La Khalaba: Behind the Designs",
      date: "20 Aug 2024",
      category: "Lifestyle",
      excerpt:
        "Step inside our creative process—where craftsmanship, passion, and artistry meet fashion.",
    },
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const handlePagination = (page: number) => setCurrentPage(page);

  const displayedPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      {/* ✨ Banner Section */}
      <div className="relative w-full mt-20">
        <Image
          src="/images/boutique-banner.jpg"
          alt="La Khalaba Blog Banner"
          width={1440}
          height={400}
          className="w-full h-[320px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl lg:text-5xl font-serif tracking-widest">
            La Khalaba Journal
          </h1>
          <p className="text-lg mt-2 opacity-90">
            Stories of style, inspiration, and elegance.
          </p>
        </div>
      </div>

      {/* 🖋 Main Content */}
      <div className="flex flex-col lg:flex-row justify-between px-6 lg:px-20 py-12 gap-12">
        {/* Left - Blog Posts */}
        <div className="lg:w-2/3">
          {displayedPosts.map((post, i) => (
            <div key={i} className="mb-16 group">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={post.src}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{post.category}</span>
                </div>
                <h2 className="text-2xl font-semibold font-serif text-gray-900 group-hover:text-[#B88E2F] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="mt-3 text-[#B88E2F] font-medium text-sm border-b border-[#B88E2F] hover:text-black hover:border-black transition">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Sidebar */}
        <div className="lg:w-1/3 space-y-10">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-[#B88E2F]"
            />
            <Image
              src="/images/search.svg"
              alt="Search"
              width={20}
              height={20}
              className="absolute right-5 top-3.5 opacity-60"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-serif">
              Categories
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              {["Style", "Fashion", "Design", "Lifestyle", "Trends"].map(
                (cat) => (
                  <li
                    key={cat}
                    className="flex justify-between hover:text-[#B88E2F] cursor-pointer"
                  >
                    <span>{cat}</span>
                    <span>→</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-serif">
              Recent Posts
            </h3>
            <div className="space-y-5">
              {blogPosts.slice(0, 4).map((post, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Image
                    src={post.src}
                    alt={post.title}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-sm hover:text-[#B88E2F] cursor-pointer">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePagination}
      />
    </>
  );
};

// ✨ Pagination Component
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
            currentPage === page
              ? "bg-[#B88E2F] text-white"
              : "border-gray-300 text-gray-600 hover:bg-[#B88E2F]/10"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default BlogPage;
