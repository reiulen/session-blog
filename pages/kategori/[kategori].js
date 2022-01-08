import Container from "../../components/Container";
import Layout from "../../components/Layout";
import SectionHeader from "../../components/SecionHeader";
import Head from "next/head";
import PostList from "../../components/PostList";
import Navbar from "../../components/Navbar";

export async function getServerSideProps({ params: { kategori } }) {
  const req = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?kategori=" + kategori);
  const posts = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const reqKategori = await res.json();

  return {
    props: {
      reqKategori,
      kategori,
      posts,
    },
  };
}

export default function kategori({ posts, kategori, reqKategori }) {
  return (
    <>
      <Head>
        <meta property="og:title" content={`Kategori ${kategori.replace("-", " ").toUpperCase()}`} />
        <meta property="og:description" content={isi} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_APIUPLOAD + thumbnail} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + "kategori/" + kategori.replace("-", " ").toUpperCase()} />
        <meta property="og:type" content="kategori artikel" />
        <meta property="webcrawlers" content="all" />
        <meta property="spiders" content="all" />
        <meta property="robots" content="all" />
        <title>Kategori {kategori.replace("-", " ").toUpperCase()}</title>
      </Head>
      <Layout>
        <Navbar kategori={reqKategori} kategorinav />
        <Container>
          <SectionHeader>{kategori.replace("-", " ").toUpperCase()}</SectionHeader>
          {!posts.length ? (
            <div className="text-center py-20">
              <h2 className="text-3xl text-black">Tidak ditemukan!</h2>
              {/* <p className="text-xl mt-4 text-white/60 w-6/12 mx-auto">Keyword tidak ditemukan silahkan cari keyword lain!</p> */}
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </Container>
      </Layout>
    </>
  );
}
