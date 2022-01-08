import Link from "next/link";

export default function Footer({ index }) {
  return (
    <footer className={`text-white/60 bg-blue-500 rounded-tl-lg  lg:rounded-tl-full bg-blue-500 rounded-tl-3xl  `}>
      <div className="lg:flex pt-10 ">
        <div className="lg:w-6/12 w-full lg:py-14 px-14  lg:pl-60 items-center">
          <a className={` uppercase lg:justify-start justify-center text-2xl index-sesion text-white/80 lg:text-2xl`}>
            Session <span className={`font-bold ml-1 ${index ? "text-white" : "text-black"}`}>Class</span>
          </a>
          <p>Session adalah nama kelas generasi ke 6 Jurusan Rekayasa Perangkat Lunak di SMK Negeri 1 Ciamis</p>
        </div>
        <div className="lg:w-6/12 w-full lg:py-12 pt-6 px-14 lg:px-0">
          <h2 className="text-2xl font-semibold text-white/80">Menu</h2>
          <ul className="ml-1">
            <Link href="/">
              <a>
                <li className="hover:text-white my-1">Home</li>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <li className="hover:text-white my-1">Blog</li>
              </a>
            </Link>
            <Link href="/project">
              <a>
                <li className="hover:text-white my-1">Project Kami</li>
              </a>
            </Link>
            <Link href="/gallery">
              <a>
                <li className="hover:text-white my-1">Galeri Foto</li>
              </a>
            </Link>
          </ul>
        </div>
      </div>
      <div className="text-white/60 text-center py-8 text-xs lg:text-sm">
        Copyright{" "}
        <a href="http://instagram.com/reihanpraja" className="hover:underline">
          &copy;rei
        </a>{" "}
        @2021
      </div>
    </footer>
  );
}
