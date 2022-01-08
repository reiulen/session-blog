import PostAuthor from "./PostAuthor";
import PostTitle from "./PostTitle";
import { formatDate } from "../utils/utils";
import HTMLReactParser from "html-react-parser";

export default function InfoPost({ slugcategory, category, date, title, slug, deskripsi, authorAvatar, authorNama, authorJob, views }) {
  return (
    <>
      <PostTitle slugcategory={slugcategory} category={category} title={title} slug={slug} date={formatDate(date)} />
      <PostAuthor authorAvatar={authorAvatar} authorJob={authorJob} authorNama={authorNama} />
      <p className="text-black/75 w-10/12 text-sm mt-2">{HTMLReactParser(deskripsi)}</p>
      <span className="text-black/60 flex items-center mx-2 justify-start my-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill mr-2" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
        {views} views
      </span>
    </>
  );
}
