import { Post, PostTitle } from '@/types';
import { PostResponse } from '../types';
import parseComment from './parseComment';
import parseUser from './parseUser';

const parsePost = (rawPost: PostResponse) => {
  const { _id, title: titleJSON, comments: rawComments, author: rawAuthor } = rawPost;

  const { title, content, musseukImageName } = JSON.parse(titleJSON) as PostTitle;
  const comments = rawComments.map((comment) => parseComment(comment));
  const author = parseUser(rawAuthor);

  const post: Post = {
    _id,
    title,
    content,
    musseukImageName,
    comments,
    author
  };

  return post;
};

export default parsePost;
