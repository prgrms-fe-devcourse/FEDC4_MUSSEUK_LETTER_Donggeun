import { Post, PostTitle } from '@/types';
import { PostResponse } from '../types';
import parseComment from './parseComment';
import parseUser from './parseUser';

const parsePost = (rawPost: PostResponse) => {
  const { _id, title: titleJSON, comments: rawComments, author: rawAuthor } = rawPost;

  const comments = rawComments.map((comment) => parseComment(comment));
  const author = parseUser(rawAuthor);

  let titleData: PostTitle;
  try {
    titleData = JSON.parse(titleJSON) as PostTitle;
  } catch (err) {
    if (err instanceof SyntaxError) {
      titleData = {
        title: '머쓱이',
        content: '',
        musseukImageName: 'musseuk_default'
      };
    } else {
      throw err;
    }
  }

  const { title = '머쓱이', content = '', musseukImageName = 'musseuk_default' } = titleData;

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
