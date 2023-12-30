import AppDataSource from '@/configs/database';
import { Post } from '@/models/Post';

const PostRepository = AppDataSource.getRepository(Post);

export default PostRepository;
