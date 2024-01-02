import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'TODO: 머쓱이 목록 조회 구현 필요...' });
});

router.post('/', (req, res) => {
  res.json({ message: 'TODO: 머쓱이 생성 구현 필요...' });
});

router.get('/:postId', (req, res) => {
  res.json({ message: 'TODO: 머쓱이 상세 조회 구현 필요...' });
});

router.put('/:postId', (req, res) => {
  res.json({ message: 'TODO: 머쓱이 수정 구현 필요...' });
});

router.delete('/:postId', (req, res) => {
  res.json({ message: 'TODO: 머쓱이 삭제 구현 필요...' });
});

router.post('/:postId/comments', (req, res) => {
  res.json({ message: 'TODO: 특정 머쓱이의 편지 목록 조회 구현 필요...' });
});

router.post('/:postId/comments', (req, res) => {
  res.json({ message: 'TODO: 특정 머쓱이에게 편지 전송 구현 필요...' });
});

export default router;
