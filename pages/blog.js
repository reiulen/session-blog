import { useState } from "react";
import FeaturedPost from "../components/FeaturedPost";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Head from "next/head";
import PostList from "../components/PostList";
import Navbar from "../components/Navbar";

export async function getServerSideProps() {
  const post = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?q=all");
  const posts = await post.json(post);

  const reqFeatured = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?q=first");
  const featured = await reqFeatured.json(reqFeatured);

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  const reqpop = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?q=populer&limit=4");
  const populer = await reqpop.json();

  return {
    props: {
      featured: featured.length > 0 ? featured[0] : false,
      posts,
      populer,
      kategori,
    },
  };
}

export default function Blog({ featured, posts, kategori, populer }) {
  return (
    <Layout kategori={kategori}>
      <Navbar kategori={kategori} blog />
      <Head>
        <meta property="og:title" content="Blog &bull; Session" />
        <meta property="og:description" content="Blog Session Generasi Ke 6 Jurusan Rekayasa Perangkat Lunak SMKN 1 Ciamis" />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_APIURL + "gambar/session.png"} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta property="webcrawlers" content="all" />
        <meta property="spiders" content="all" />
        <meta property="robots" content="all" />
        <meta name="keywords" content="blog, web blog, artikel, website kelas, sesion class smkn 1 ciamis, session, smkn 1 ciamis, smk negeri 1 ciamis, website kelas keren" />
        <title>Blog &bull; Session</title>
      </Head>
      <Container>
        {featured && <FeaturedPost {...featured} />}
        <div className="text-black/80 font-bold text-3xl md:mt-12 mb-3">Artikel Populer</div>
        <PostList posts={populer} />
        <div className="text-black/80 font-bold text-3xl md:mt-12 mb-3">Artikel Lainnya</div>
        <PostList posts={posts} />
      </Container>
    </Layout>
  );
}
