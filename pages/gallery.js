import Container from "../components/Container";
import Layout from "../components/Layout";
import SectionHeader from "../components/SecionHeader";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { formatDate } from "../utils/utils";

export async function getServerSideProps({ query: { q } }) {
  const req = await fetch(process.env.NEXT_PUBLIC_APIURL + "gallery");
  const posts = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  return {
    props: {
      kategori,
      posts,
    },
  };
}

export default function gallery({ posts, kategori }) {
  return (
    <>
      <Head>
        <meta property="og:title" content="Blog &bull; Session" />
        <meta property="og:description" content="Galeri Foto Kelas Session Generasi Ke 6 Jurusan Rekayasa Perangkat Lunak SMKN 1 Ciamis" />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_APIURL + "gambar/session.png"} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta property="webcrawlers" content="all" />
        <meta property="spiders" content="all" />
        <meta property="robots" content="all" />
        <meta name="keywords" content="galeri foto kelas, galeri foto, web galeri, blog, web blog, artikel, website kelas, sesion class smkn 1 ciamis, session, smkn 1 ciamis, smk negeri 1 ciamis, website kelas keren" />
        <title>Galeri Foto</title>
      </Head>
      <Layout>
        <Navbar kategori={kategori} gallery />
        <Container>
          <SectionHeader>Galeri Foto</SectionHeader>
          {posts && (
            <div className="md:flex flex-wrap">
              {posts.map((post) => (
                <div key={post.id} className="md:w-4/12 w-full gallery">
                  <Link href={`/gallery/${post.slug}`}>
                    <a>
                      <div className="bg-gray-100 p-3 rounded-md  grid grid-cols-3 gap-2 md:gap-3 mx-4 mt-4 gambar-gallery">
                        {post.gambar.map((gambar) => (
                          <div
                            key={gambar.id}
                            className="rounded bg-center bg-cover bg-no-repeat first:col-span-3 col-span-1 px-4 py-2 w-full h-[50px] first:h-[150px] md:h-[70px] md:first:h-[200px]"
                            style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_APIUPLOAD + gambar.filename})` }}
                          ></div>
                        ))}
                      </div>
                      <div className="mt-2 mb-4 px-5 text-gallery">
                        <h1 className="text-xl font-semibold text-black/80">{post.judul}</h1>
                        <p className="text-black/60 ">{formatDate(post.created_at)}</p>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
}
