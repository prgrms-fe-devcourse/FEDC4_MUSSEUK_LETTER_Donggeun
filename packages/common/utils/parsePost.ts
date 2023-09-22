import { Post, PostTitle } from '../types';
import { PostResponse } from '../types/raws';
import parseComment from './parseComment';
import parseUser from './parseUser';

const parsePost = (rawPost: PostResponse): Post => {
  let titleField;

  try {
    titleField = JSON.parse(rawPost.title) as PostTitle;
  } catch (err) {}

  return {
    _id: rawPost._id,
    title: titleField?.title ?? '머쓱이',
    content: titleField?.content ?? '',
    musseukImageName: titleField?.musseukImageName ?? 'musseuk_default',
    comments: rawPost.comments.map((comment) => parseComment(comment)),
    author: parseUser(rawPost.author)
  };
};

export default parsePost;
