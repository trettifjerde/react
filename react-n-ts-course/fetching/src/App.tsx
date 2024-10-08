import { useEffect, useState } from "react";
import { fetchData } from "./utils/fetch";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchImage from './assets/data-fetching.png';
import { $posts } from "./utils/schema";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);

    fetchData('https://jsonplaceholder.typicode.com/posts', $posts)
      .then(data => data.map(post => ({
        id: post.id,
        title: post.title,
        text: post.body
      })))
      .then(posts => {
        setPosts(posts);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsFetching(false));

  }, []);

  const content = isFetching ? <p>Fetching posts...</p> : 
    error ? <ErrorMessage text={error} /> : 
    <BlogPosts posts={posts} />;

  return <main>
    <img src={fetchImage} alt="An abstract image" />
    {content}
  </main>
}

export default App;
