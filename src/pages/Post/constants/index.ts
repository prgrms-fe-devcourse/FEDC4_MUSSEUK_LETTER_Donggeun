import Beer1 from '@/assets/images/decoration_beer1.png';
import Chicken1 from '@/assets/images/decoration_chicken1.png';
import Coffee1 from '@/assets/images/decoration_coffee1.png';
import Glasses1 from '@/assets/images/decoration_glasses1.png';
import Hat1 from '@/assets/images/decoration_hat1.png';
import Medal1 from '@/assets/images/decoration_medal1.png';
import Soju1 from '@/assets/images/decoration_soju1.png';
import Uh1 from '@/assets/images/decoration_uh1.png';
import { DECORATION_IMAGE_NAME } from '@/constants/imageNames';

export const COMMENT_INFO_ACTION = {
  CONTENT: 'SET_CONTENT',
  POSITION: 'SET_POSITION',
  NICKNAME: 'SET_NICKNAME',
  DECORATION: 'SET_DECORATION_IMAGE_NAME'
} as const;

export const DECORATION_IMAGE = {
  [DECORATION_IMAGE_NAME.BEER1]: Beer1,
  [DECORATION_IMAGE_NAME.CHICKEN1]: Chicken1,
  [DECORATION_IMAGE_NAME.COFFEE1]: Coffee1,
  [DECORATION_IMAGE_NAME.GLASSES1]: Glasses1,
  [DECORATION_IMAGE_NAME.HAT1]: Hat1,
  [DECORATION_IMAGE_NAME.MEDAL1]: Medal1,
  [DECORATION_IMAGE_NAME.SOJU1]: Soju1,
  [DECORATION_IMAGE_NAME.UH1]: Uh1
} as const;
