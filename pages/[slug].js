import Container from "../components/Container";
import Layout from "../components/Layout";
import PostAuthor from "../components/PostAuthor";
import PostTitle from "../components/PostTitle";
import Head from "next/head";
import HTMLReactParser from "html-react-parser";
import PostList from "../components/PostList";
import Navbar from "../components/Navbar";
import Tilt from "react-vanilla-tilt";
import Link from "next/link";
import { formatDate } from "../utils/utils";

export async function getServerSideProps({ params: { slug } }) {
  const reqDetail = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?slug=" + slug);
  const single = await reqDetail.json();

  const reqPost = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?q=rekomendasi");
  const posts = await reqPost.json();

  const res = await fetch(process.env.NEXT_PUBLIC_APIURL + "kategori");
  const kategori = await res.json();

  const reqPop = await fetch(process.env.NEXT_PUBLIC_APIURL + "post?q=populer&limit=5");
  const populer = await reqPop.json();

  if (!single.length)
    return {
      notFound: true,
    };

  return {
    props: {
      single: single.length > 0 ? single[0] : {},
      kategori,
      posts,
      populer,
    },
  };
}

export default function Detail({ single: { judul, slug, kategori, thumbnail, created_at, user, views, isi, tag }, posts, kategori: initialKategori, populer }) {
  return (
    <Layout>
      <Navbar kategori={initialKategori} blog />
      <Head>
        <meta property="og:title" content={judul} />
        <meta property="og:description" content={isi} />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_APIUPLOAD + thumbnail} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + slug} />
        <meta property="og:type" content="artikel" />
        <meta property="webcrawlers" content="all" />
        <meta property="spiders" content="all" />
        <meta property="robots" content="all" />
        <meta name="keywords" content={tag} />
        <title>{judul}</title>
      </Head>
      <Container center>
        <div className="md:flex">
          <div className="lg:w-9/12 w-full bg-white md:px-10 px-5 md:py-8 py-5 md:border border-black/10">
            <PostTitle slug={slug} slugcategory={kategori.slug} category={kategori.kategori} date={formatDate(created_at)} title={judul} center />
            <div className="flex text-black/60 items-center">
              <PostAuthor authorNama={user.nama} authorAvatar={user.avatar} views={views} />
              <span className="mx-3">&bull;</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
              <span className="mx-2">{views} views</span>
            </div>
            <img src={process.env.NEXT_PUBLIC_APIUPLOAD + thumbnail} className="rounded-lg w-full md:my-8 my-5 " />
            <article className="text-justify mb-4 w-full font-medium text-black/95">{HTMLReactParser(isi)}</article>
            <div className="flex items-center justify-center md:justify-start space-x-5 py-5 text-center flex-wrap">
              <button>
                <a
                  href={`whatsapp://send?text=${judul} ${process.env.NEXT_PUBLIC_URL + slug}`}
                  target="_blank"
                  rel="noopener"
                  aria-label="Share on Whatsapp"
                  className="bg-green-600 my-2 text-xs md:text-base hover:animate-bounce py-2 px-5 md:px-10 text-white rounded-md flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp mr-1" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  Whatsapp
                </a>
              </button>
              <button>
                <a
                  href={`https://twitter.com/intent/tweet/?text=${judul} ${process.env.NEXT_PUBLIC_URL + slug}`}
                  target="_blank"
                  rel="noopener"
                  aria-label="Share on Twitter"
                  className="bg-blue-400 my-2 text-xs md:text-base hover:animate-bounce py-2 px-5 md:px-10 text-white rounded-md items-center flex"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter mr-1" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  Twitter
                </a>
              </button>
              <button>
                <a
                  href=""
                  href={`https://www.facebook.com/sharer.php?u=${judul} ${process.env.NEXT_PUBLIC_URL + slug}`}
                  target="_blank"
                  rel="noopener"
                  aria-label="Share on Facebook"
                  className="bg-blue-600 my-2 text-xs md:text-base hover:animate-bounce py-2 px-5 md:px-10 focus:bg-blue-500 text-white rounded-md flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-facebook mr-1" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  Facebook
                </a>
              </button>
            </div>
            <div className="text-justify my-2 text-black">Tags : {tag}</div>
          </div>
          <div className="lg:w-3/10 md:ml-5 md:my-0 my-5">
            <Tilt className="index-tilt w-72 text-xl text-center animation justify-center items-center">
              <img src={process.env.NEXT_PUBLIC_APIASSET + "assets/gambar/logo.png"} className="w-60 justify-center items-center" />
            </Tilt>
            <div className="bg-white mb-7 border border-black/10">
              <div className=" text-xl font-semibold py-3 text-center text-black bg-gray-50 border-b border-black/10">Follow Kami</div>
              <div className="flex justify-center items-center py-4 space-x-2">
                <a href="https://instagram.com/official_session">
                  <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-10 h-10 pl-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
            <div className="bg-white lg:w-[320px] my-7 border border-black/10">
              <div className="text-xl  font-semibold py-3 text-center border-b border-black/10 text-black bg-gray-50">Artikel Populer</div>
              {populer &&
                populer.map((populers) => (
                  <div key={populers.id} className="px-4 border-b border-black/10 last:border-0">
                    <Link href={`/${populers.slug}`}>
                      <a>
                        <article className="text-base pt-4 text-black/60 font-semibold hover:text-blue-600">{populers.judul}</article>
                        <div className="flex justify-between pt-3 pb-2 text-sm text-gray-400 font-light">
                          <span>{formatDate(populers.created_at)}</span>
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill mr-1" viewBox="0 0 16 16">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>{" "}
                            {populers.views} views
                          </span>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="md:px-4 py-20">
          <div className="text-3xl text-black font-semibold">Artikel Lainnya</div>
          <PostList posts={posts} />
        </div>
      </Container>
    </Layout>
  );
}
