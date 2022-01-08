import Link from "next/link";
import InfoPost from "./InfoPost";

export default function CardPost(props) {
  return (
    <article>
      <Link href={`/${props.slug}`}>
        <a>
          <img src={process.env.NEXT_PUBLIC_APIUPLOAD + props.thumbnail} className="w-full rounded mb-4" />
        </a>
      </Link>
      <InfoPost
        slugcategory={props.kategori.slug}
        category={props.kategori.kategori}
        date={props.created_at}
        slug={props.slug}
        title={props.judul}
        deskripsi={`${props.isi.substring(0, 150)}....`}
        authorAvatar={props.user.avatar}
        authorNama={props.user.nama}
        views={props.views}
      />
    </article>
  );
}
