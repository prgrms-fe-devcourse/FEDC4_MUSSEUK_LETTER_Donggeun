import { Image, ImageProps } from '@chakra-ui/react';
import MusseukDefault from '@/assets/images/musseuk_default.png';
import { forwardRef } from 'react';

const Musseuk = forwardRef<HTMLImageElement | null>((props: ImageProps, ref) => {
  // TODO: 크기 기준점으로 삼고 있어서 로드 안됐을 때 크기 설정 필요함
  return <Image src={MusseukDefault} alt="musseuk" w="90vw" maxW="45rem" ref={ref} />;
});

Musseuk.displayName = 'Musseuk';

export default Musseuk;
