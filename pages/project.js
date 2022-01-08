import Container from "../components/Container";
import Layout from "../components/Layout";
import SectionHeader from "../components/SecionHeader";
import Head from "next/head";
import PostList from "../components/PostList";
import Navbar from "../components/Navbar";

export async function getServerSideProps({ query: { q } }) {
  const req = await fetch(process.env.NEXT_PUBLIC_APIURL + "project");
  const project = await req.json();

  return {
    props: {
      project,
    },
  };
}

export default function search({ project }) {
  return (
    <>
      <Head>
        <title>Project Kami</title>
      </Head>
      <Layout>
        <Navbar project />
        <Container>
          <SectionHeader>Project yang Kami Buat</SectionHeader>
          {project && (
            <div className="md:flex flex-wrap mx-auto">
              {project.map((projects) => (
                <div key={projects.id} className="md:w-4/12">
                  <div className="my-4 md:m-2">
                    <div className="bg-white rounded-md  shadow-md pb-10 hover:translate-y-5">
                      <img src={process.env.NEXT_PUBLIC_APIUPLOAD + projects.thumbnail} className="object-cover rounded-md" />
                      <h1 className="font-semibold text-black/80 px-5 text-xl pt-3">{projects.judul}</h1>
                      <p className="text-black/60 text-lg px-5 pt-2 pb-3">{projects.deskripsi}</p>
                      <a href={projects.link}>
                        <button className="bg-blue-600 hover:bg-blue-700 focus:border border-gray-400 hover:translate-x-2 rounded-md px-5 py-2 mx-5 mt-3 flex items-center text-base">
                          Kunjungi{" "}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle ml-2" viewBox="0 0 16 16">
                            <path
                              fillRule="evenodd"
                              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                            />
                          </svg>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
}
