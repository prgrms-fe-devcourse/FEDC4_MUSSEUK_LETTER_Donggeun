import { useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  return (
    <>
      <h1>Post</h1>
      {postId}의 Post 입니다.
    </>
  );
};

export default Post;
