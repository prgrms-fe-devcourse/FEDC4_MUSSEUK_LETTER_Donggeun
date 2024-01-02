import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'TODO: 사용자 목록 조회 구현 필요...' });
});

router.get('/:userId', (req, res) => {
  res.json({ message: `TODO: 특정 사용자 조회 구현 필요...` });
});

router.put('/:userId', (req, res) => {
  res.json({ message: `TODO: 사용자의 정보 수정 구현 필요...` });
});

router.put('/:userId/photo', (req, res) => {
  res.json({ message: `TODO: 사용자의 프로필 사진 변경 구현 필요...` });
});

router.delete('/:userId/photo/slack', (req, res) => {
  res.json({ message: `TODO: 사용자의 슬랙 연동 계정 수정 구현 필요...` });
});

export default router;
