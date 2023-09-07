import { useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  return (
    <>
      <h1>Post page</h1>
      {postId}의 post 입니다.
    </>
  );
};

export default Post;
