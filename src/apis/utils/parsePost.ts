import { Post, customPostTitle } from '@/types';
import { PostResponse } from '../types';
import parseComment from './parseComment';
import parseUser from './parseUser';

const parsePost = (rawPost: PostResponse) => {
  const { _id, title: titleJSON, comments: rawComments, author: rawAuthor } = rawPost;

  const { title, content, musseukId } = JSON.parse(titleJSON) as customPostTitle;
  const comments = rawComments.map((comment) => parseComment(comment));
  const author = parseUser(rawAuthor);

  const customPost: Post = {
    _id,
    title,
    content,
    musseukId,
    comments,
    author
  };

  return customPost;
};

export default parsePost;
