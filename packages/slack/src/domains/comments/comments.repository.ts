import AppDataSource from '@/configs/database';
import { Comment } from '@/models/Comment';

const CommentRepository = AppDataSource.getRepository(Comment);

export default CommentRepository;
