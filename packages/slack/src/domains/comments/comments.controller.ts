import express from 'express';

const router = express.Router();

router.get('/:commentId', (req, res) => {
  res.json({ message: 'TODO: 편지 상세 조회 구현 필요...' });
});

export default router;
