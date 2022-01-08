import Container from "../../components/Container";
import Layout from "../../components/Layout";
import SectionHeader from "../../components/SecionHeader";
import Head from "next/head";
import PostList from "../../components/PostList";
import Navbar from "../../components/Navbar";

export async function getServerSideProps({ params: { author } }) {
  const req = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?author=" + author);
  const posts = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      kategori,
      author,
      posts,
    },
  };
}

export default function kategori({ posts, author, kategori }) {
  return (
    <>
      <Head>
        <title>Author {author}</title>
      </Head>
      <Layout>
        <Navbar kategori={kategori} />
        <Container>
          <SectionHeader author>Author : {author}</SectionHeader>
          <div className="text-center bg-black w-1/12 mx-auto font-bold mb-6">{posts.length} POST</div>
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
