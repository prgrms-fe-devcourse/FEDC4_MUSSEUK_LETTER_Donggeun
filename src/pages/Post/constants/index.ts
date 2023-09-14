export const MUSSEUK_IMAGE_NAME = {
  DEFAULT: 'musseuk_default',
  HEART: 'musseuk_heart',
  HOOD: 'musseuk_hood',
  LAPTOP: 'musseuk_laptop',
  SEMICOLON: 'musseuk_semicolon'
};

export type MusseukType = (typeof MUSSEUK_IMAGE_NAME)[keyof typeof MUSSEUK_IMAGE_NAME];

export const DECORATION_IMAGE_NAME = {
  BEER1: 'decoration_beer1',
  CHICKEN1: 'decoration_chicken1',
  COFFEE1: 'decoration_coffee1',
  GLASSES1: 'decoration_glasses1',
  HAT1: 'decoration_hat1',
  MEDAL1: 'decoration_medal1',
  SOJU1: 'decoration_soju1',
  UH1: 'decoration_uh1'
} as const;

export type DecorationType = (typeof DECORATION_IMAGE_NAME)[keyof typeof DECORATION_IMAGE_NAME];
