import Layout from "../components/Layout";
import Head from "next/head";
import Tilt from "react-vanilla-tilt";
import Navbar from "../components/Navbar";

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  return {
    props: {
      kategori,
    },
  };
}

export default function Home({ kategori }) {
  return (
    <Layout kategori={kategori} index>
      <Navbar kategori={kategori} index />
      <Head>
        <meta property="og:title" content="Beranda &bull; Session" />
        <meta property="og:description" content="Website Kelas dan juga Web Blog Session Generasi Ke 6 Jurusan Rekayasa Perangkat Lunak SMKN 1 Ciamis" />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_APIURL + "gambar/session.png"} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta property="webcrawlers" content="all" />
        <meta property="spiders" content="all" />
        <meta property="robots" content="all" />
        <meta name="keywords" content="blog, web blog, artikel, website kelas, sesion class smkn 1 ciamis, session, smkn 1 ciamis, smk negeri 1 ciamis, website kelas keren" />
        <title>Beranda &bull; Session</title>
      </Head>
      <div className="container mx-auto text-white items-center py-56 md:py-44 hover:cursor-pointer">
        <div className="index-sesion 6/12 mx-auto flex items-center flex-col">
          <Tilt className="index-tilt">
            <div className="text-center flex items-center justify-center">
              <h1 id="typing" className="md:text-4xl text-xl text-white font-bold flex">
                We Are.....
              </h1>
              <div id="line">|</div>
            </div>
            <h1 className="md:text-8xl text-4xl uppercase justify-center text-center font-bold text-blue-500 animation">
              Session <span className="text-yellow-600 animation">Class</span>
            </h1>
          </Tilt>
        </div>
      </div>
    </Layout>
  );
}
