export const DECO_ID = {
  BEER1: 'beer1',
  CHICKEN1: 'chicken1',
  COFFEE1: 'coffee1',
  GLASSES1: 'glasses1',
  HAT1: 'hat1',
  MEDAL1: 'medal1',
  SOJU1: 'soju1',
  UH1: 'uh1'
} as const;

export type decoType = (typeof DECO_ID)[keyof typeof DECO_ID];
