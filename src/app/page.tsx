"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const LazyProducts = dynamic(() => import("../app/query/Homeproducts/page"), {
  ssr: false,
});

const Page = () => {
  return (
    <>
      {/* 🌸 Hero Section */}
      <section className="relative bg-[#F8F5F0]">
        <Image
          src="/images/la-hero.jpg"
          alt="La Khalaba Boutique Hero"
          width={1440}
          height={600}
          className="w-full h-auto object-cover mt-20"
          priority
          fetchPriority="high"
        />
        <div className="absolute top-1/2 left-6 md:left-20 transform -translate-y-1/2 bg-white/70 p-6 md:p-12 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-[#6B4E23] uppercase text-sm font-semibold tracking-widest">
            La Khalaba Exclusive
          </h2>
          <h1 className="text-[#1E1E1E] text-2xl md:text-4xl font-bold mt-3 leading-snug">
            Elevate Your Elegance with Our <br />
            <span className="text-[#C2A356]">New Abaya Collection</span>
          </h1>
          <p className="text-[#555] mt-4 text-sm md:text-base">
            Discover timeless styles crafted with luxury fabrics and modern
            cuts. Designed for confident women.
          </p>
          <Link href={"/shop"}>
            <button className="mt-6 bg-[#C2A356] text-white text-sm md:text-base px-6 py-3 hover:bg-[#A98F45] transition">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* 🖤 Categories Section */}
      <section className="py-16 bg-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E1E]">
          Browse Our Collections
        </h1>
        <p className="text-gray-600 mt-3">
          Discover fashion designed for every occasion.
        </p>

        <div className="flex flex-wrap justify-center gap-10 mt-14">
          {["Abayas", "Dresses", "Scarves"].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image
                src={`/images/fashion${i + 1}.jpg`}
                alt={item}
                width={380}
                height={480}
                className="rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-xl font-semibold text-[#3C3C3C] mt-4">
                {item}
              </h2>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ New Collection Section */}
      <section className="bg-[#FDFBF8] py-20">
        <h1 className="text-[#1E1E1E] text-3xl md:text-4xl font-bold text-center mb-10">
          New Collection
        </h1>

        {/* Lazy-loaded products */}
        <LazyProducts />

        <div className="flex justify-center mt-8">
          <Link href={"/shop"}>
            <button className="border border-[#C2A356] text-[#C2A356] px-8 py-3 text-base hover:bg-[#C2A356] hover:text-white transition">
              View All
            </button>
          </Link>
        </div>
      </section>

      {/* 🌿 Inspiration Section */}
      <section className="bg-[#F8F5F0] py-16 flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E1E]">
            Inspired by Modesty, Designed for You
          </h1>
          <p className="text-[#555] mt-4">
            Each piece reflects grace, beauty, and confidence. Explore outfits
            crafted for every modern woman.
          </p>
          <Link href={"/lookbook"}>
            <button className="mt-6 bg-[#C2A356] text-white px-8 py-3 hover:bg-[#A98F45] transition">
              Explore Lookbook
            </button>
          </Link>
        </div>

        <div className="flex gap-6">
          <Image
            src="/images/abaya-look1.jpg"
            alt="Look 1"
            width={400}
            height={500}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <Image
            src="/images/abaya-look2.jpg"
            alt="Look 2"
            width={350}
            height={450}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* 🕊️ Social Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-sm uppercase text-gray-600 tracking-widest">
          Follow Us On Instagram
        </h2>
        <h1 className="text-3xl font-bold text-[#1E1E1E] mt-2">
          #LaKhalabaStyle
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {["insta1", "insta2", "insta3", "insta4", "insta5", "insta6"].map(
            (img, i) => (
              <Image
                key={i}
                src={`/images/${img}.jpg`}
                alt={img}
                width={220}
                height={250}
                className="rounded-lg hover:scale-105 transition-transform duration-300"
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
