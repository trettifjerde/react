import { useRouter } from "next/router";

const NewsItem = () => {
    const router = useRouter();
    const id = router.query.newsId;
    return <div>News Item {id}</div>
}

export default NewsItem;