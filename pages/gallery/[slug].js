import Container from "../../components/Container";
import Layout from "../../components/Layout";
import SectionHeader from "../../components/SecionHeader";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import React, { useRef, useState } from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { formatDate } from "../../utils/utils";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

export async function getServerSideProps({ params: { slug } }) {
  const req = await fetch(process.env.NEXT_PUBLIC_APIURL + "gallery?slug=" + slug);
  const gambar = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  const reqpost = await fetch(process.env.NEXT_PUBLIC_APIURL + "gallery?limit=3");
  const posts = await reqpost.json();

  if (!gambar.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      kategori,
      posts,
      gambar: gambar.length > 0 ? gambar[0] : false,
    },
  };
}

export default function gallery({ gambar, kategori, posts }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Head>
        <meta property="og:title" content={gambar.judul} />
        <meta property="og:description" content={gambar.judul} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + "gallery/" + gambar.slug} />
        <meta property="og:type" content="artikel" />
        <meta property="webcrawlers" content="all" />
        <meta property="spiders" content="all" />
        <meta property="robots" content="all" />
        <meta name="keywords" content={gambar.judul} />
        <title>Galeri {gambar.judul}</title>
      </Head>
      <Layout>
        <Navbar kategori={kategori} gallery />
        <Container>
          <SectionHeader></SectionHeader>
          <div className="bg-gradient-to-r from-gray-600 to-gray-900 pb-20 rounded-xl">
            <div className="py-6 text-center">
              <div className="md:text-4xl text-xl font-bold">{gambar.judul}</div>
              <div className="md:text-tiny text-sm">{formatDate(gambar.created_at)}</div>
            </div>
            <div className="flex">
              <div className="mx-auto w-10/12">
                <Swiper style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }} spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2">
                  {gambar.gambar.map((gambars) => (
                    <SwiperSlide key={gambars.id}>
                      <img src={process.env.NEXT_PUBLIC_APIUPLOAD + gambars.filename} className="rounded-lg" />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} className="mySwiper">
                  {gambar.gambar.map((gambars) => (
                    <SwiperSlide key={gambars.id}>
                      <img src={process.env.NEXT_PUBLIC_APIUPLOAD + gambars.filename} className="md:rounded-lg md:p-3 p-1" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-black/90 font-semibold text-3xl px-5 pt-10">Galeri Foto Lainnya</h1>
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
          </div>
        </Container>
      </Layout>
    </>
  );
}
