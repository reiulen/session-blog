import Container from "../components/Container";
import Layout from "../components/Layout";
import SectionHeader from "../components/SecionHeader";
import Head from "next/head";
import PostList from "../components/PostList";
import Navbar from "../components/Navbar";

export async function getServerSideProps({ query: { q } }) {
  const req = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?search=" + q);
  const posts = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  return {
    props: {
      kategori,
      posts,
      q,
    },
  };
}

export default function search({ posts, q, kategori }) {
  return (
    <>
      <Head>
        <title>Search : {q}</title>
      </Head>
      <Layout>
        <Navbar kategori={kategori} />
        <Container>
          <SectionHeader>Search : {q}</SectionHeader>
          {!posts.length ? (
            <div className="text-center py-20 text-black">
              <h2 className="md:text-4xl text-xl">Tidak ditemukan!</h2>
              <p className="text-sm md:text-md mt-4 md:w-6/12 mx-auto">Keyword tidak ditemukan silahkan cari keyword lain!</p>
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </Container>
      </Layout>
    </>
  );
}
