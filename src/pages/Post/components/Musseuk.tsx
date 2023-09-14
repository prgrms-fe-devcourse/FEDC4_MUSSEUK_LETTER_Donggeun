import { Image, ImageProps } from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { MusseukType } from '@/types';
import MusseukDefault from '@/assets/images/musseuk_default.png';
import MusseukHeart from '@/assets/images/musseuk_heart.png';
import MusseukHood from '@/assets/images/musseuk_hood.png';
import MusseukLaptop from '@/assets/images/musseuk_laptop.png';
import MusseukSemicolon from '@/assets/images/musseuk_semicolon.png';

type MusseukProps = {
  musseukImageName: MusseukType;
} & ImageProps;

const Musseuk = forwardRef<HTMLImageElement, MusseukProps>(
  ({ musseukImageName, ...props }: MusseukProps, ref: ForwardedRef<HTMLImageElement>) => {
    // TODO: 크기 기준점으로 삼고 있어서 로드 안됐을 때 크기 설정 필요함
    return <Image src={musseukImage[musseukImageName]} alt="musseuk" w="90vw" maxW="45rem" ref={ref} {...props} />;
  }
);

const musseukImage = {
  musseuk_default: MusseukDefault,
  musseuk_heart: MusseukHeart,
  musseuk_hood: MusseukHood,
  musseuk_laptop: MusseukLaptop,
  musseuk_semicolon: MusseukSemicolon
};

Musseuk.displayName = 'musseuk';

export default Musseuk;
