import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

export default function Navbar({ kategori, index, gallery, project, blog, kategorinav }) {
  const [keyword, setKeyword] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [offCanvas, setOffcanvas] = useState(false);
  const [search, setSearch] = useState(false);

  function doSearch(e) {
    e.preventDefault();

    Router.push({
      pathname: "/search",
      query: {
        q: keyword,
      },
    });
  }

  return (
    <nav className={`py-4 md:py-6 fixed w-full md:px-14 z-50 uppercase  ${index ? "" : "bg-white"}`}>
      <div className="container mx-auto md:px-0 px-6">
        <div className="flex flex-wrap items-center font-semibold">
          <div className="w-2/12 md:hidden justify-start items-center">
            <button onClick={() => setOffcanvas(!offCanvas)} className="bg-gray-200 text-3xl p-2 rounded-xl  focus:border border-gray-500 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-justify-right text-black" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
          <div className="md:w-4/12 w-8/12 md:justify-start justify-center items-center">
            <Link href="/">
              <a className={`flex items-center uppercase md:justify-start justify-center text-xl index-sesion ${index ? "text-white/80" : "text-black/70"} md:text-2xl`}>
                <img src={process.env.NEXT_PUBLIC_APIASSET + "assets/gambar/session.png"} className="h-[40px]" />
                Session <span className={`font-bold ml-1 ${index ? "text-white" : "text-black"}`}>Class</span>
              </a>
            </Link>
          </div>
          <div className="w-2/12 md:hidden text-right">
            <button onClick={() => setSearch(!search)} className="bg-gray-200 p-3 rounded-xl  focus:border border-gray-500 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-black" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          <div className={`md:w-8/12 text-aya fixed w-10/12 md:bg-none md:static top-0 h-full md:auto md:p-0 p-10 transition-all ${index ? "text-white" : "text-black/40 "} ${offCanvas ? "left-0 bg-white text-black" : "-left-full"}`}>
            <ul className="md:space-x-5 justify-end flex flex-wrap md:items-center md:flex-row flex-col md:space-y-0 space-y-4 ">
              <div className="flex md:hidden md:pb-0 pb-3 items-center">
                <Link href="/">
                  <a className={`flex items-center uppercase md:justify-start justify-center text-xl index-sesion ${index ? "text-white/80" : "text-black/70"} md:text-2xl`}>
                    <img src={process.env.NEXT_PUBLIC_APIASSET + "assets/gambar/session.png"} className="h-[40px]" />
                    Session <span className={`font-bold ml-1 ${index ? "text-white" : "text-black"}`}>Class</span>
                  </a>
                </Link>
                <button onClick={() => setOffcanvas(false)} className="absolute top-12 right-10 md:hidden ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x text-black">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <li className=" md:border-0 md:pb-0 border-b border-gray-30 pb-2">
                <Link href="/">
                  <a className={` ${offCanvas && index ? " active-nav" : ""} ${index ? "text-white" : "text-black/40 hover:text-black"}`}>Home</a>
                </Link>
              </li>
              <li className=" md:border-0 md:pb-0 border-b border-gray-30 pb-2">
                <Link href="/blog">
                  <a className={` ${offCanvas && index ? "offcanvas" : ""} ${index ? "text-white/90 hover:text-white" : "hover:text-black"} ${blog ? "text-black" : "text-black/40"}`}>Blog</a>
                </Link>
              </li>
              <li className=" md:border-0 md:pb-0 border-b border-gray-30 pb-2">
                <Link href="/project">
                  <a className={`hover:text-black ${offCanvas && index ? "offcanvas" : ""} ${index ? "text-white/90 hover:text-white" : "hover:text-black"} ${project ? "text-black" : "text-black/40"}`}>Project Kami</a>
                </Link>
              </li>
              <li className=" md:border-0 md:pb-0 border-b border-gray-30 pb-2">
                <Link href="/gallery">
                  <a className={`hover:text-black ${offCanvas && index ? "offcanvas" : ""} ${index ? "text-white/90 hover:text-white" : "hover:text-black"} ${gallery ? "text-black" : "text-black/40"}`}>Galeri Foto</a>
                </Link>
              </li>
              <li className=" md:border-0 md:pb-0 border-b border-gray-30 pb-2">
                <a
                  className={`${offCanvas && index ? "offcanvas" : ""} ${index ? "text-white/90 hover:text-white" : "hover:text-black"} cursor-pointer flex items-center ${kategorinav ? "text-black" : "text-black/40"}`}
                  onClick={() => setDropdown(!dropdown)}
                >
                  Kategori
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                {dropdown && (
                  <ul className="absolute w-[200px] bg-white rounded shadow-2xl mt-4">
                    {kategori.map((kategories) => (
                      <li key={kategories.id} className="border-b border-black/10 last:border-0">
                        <Link href={`/kategori/${kategories.slug}`}>
                          <a className="flex py-3 px-6 hover:bg-black/25 text-black/70">{kategories.kategori}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="after:border-r-2 border-gray-300 hidden md:block"></li>
              <li className="md:block hidden">
                <button onClick={() => setSearch(!search)} type="button" className="bg-gray-200 p-3 text-black rounded-xl  focus:border  border-gray-500 hover:bg-gray-100">
                  {!search ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x text-black">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          </div>
          <div className={`absolute md:w-4/12 w-full left-0 md:px-0  px-2 transition-all md:static ${search ? "top-4 px-5" : "-top-40 md:hidden"}`}>
            <button onClick={() => setSearch(false)} className="absolute top-2 right-5 md:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x text-black">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <form onSubmit={doSearch}>
              <input type="search" className="bg-white py-2 px-4 w-full md:py-2 md:ml-2 text-black border-2 border-black/30 rounded-lg md:rounded-full" placeholder="Search..." onChange={(e) => setKeyword(e.target.value)} />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
