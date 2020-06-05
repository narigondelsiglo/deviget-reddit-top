// initially use the examples
import top from "./top.json";

const parseJsonToPosts = ({ data }) => ({
  id: data.id,
  author: data.author_fullname || data.author,
  imgUrl: data.thumbnail,
  title: data.title,
  time: data.created_utc,
  comments: data.num_comments,
});

export default top.data?.children?.map(parseJsonToPosts) || [];

// export default async () => {
//   const response = await fetch("https://www.reddit.com/top.json?limit=50");
//   const json = await response.json();
//   return json.data?.children?.map(parseJsonToPosts);
// };
