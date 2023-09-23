import { SnsApiInstance } from '@/apis/instance';
import { PostResponse } from 'common/types/raws';
import parsePost from 'common/utils/parsePost';

const getPostDetail = async (postId: string) => {
  const { data } = await SnsApiInstance<PostResponse>({
    method: 'GET',
    url: `/posts/${postId}`
  });

  return parsePost(data);
};

export default getPostDetail;
