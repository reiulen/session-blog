import Link from "next/link";
import InfoPost from "./InfoPost";

export default function FeaturedPost(props) {
  return (
    <article>
      <div className="flex -mx-4 mt-3 lg:items-center items-start rounded-lg flex-wrap bg-white p-5">
        <div className="px-4 lg:w-8/12 md:w-7/12 w-full">
          <Link href={`/${props.slug}`}>
            <a>
              <img src={process.env.NEXT_PUBLIC_APIUPLOAD + props.thumbnail} className="rounded-xl w-full mb-4 md:mb-0" />
            </a>
          </Link>
        </div>
        <div className="lg:w-4/12 md:w-5/12 px-4">
          <InfoPost
            slugcategory={props.kategori.slug}
            category={props.kategori.kategori}
            slug={props.slug}
            date={props.created_at}
            title={props.judul}
            deskripsi={`${props.isi.substring(0, 300)}....`}
            authorAvatar={props.user.avatar}
            authorNama={props.user.nama}
            views={props.views}
          />
        </div>
      </div>
      <hr className="border-white/10 mt-10 md:hidden" />
    </article>
  );
}
