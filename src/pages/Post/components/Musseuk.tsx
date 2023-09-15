import { Image, ImageProps } from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { MusseukType } from '@/types';
import { MUSSEUK_IMAGE } from '../constants';

type MusseukProps = {
  musseukImageName: MusseukType;
} & ImageProps;

const Musseuk = forwardRef<HTMLImageElement, MusseukProps>(
  ({ musseukImageName, ...props }: MusseukProps, ref: ForwardedRef<HTMLImageElement>) => {
    // TODO: 크기 기준점으로 삼고 있어서 로드 안됐을 때 크기 설정 필요함
    return <Image src={MUSSEUK_IMAGE[musseukImageName]} alt="musseuk" w="90vw" maxW="45rem" ref={ref} {...props} />;
  }
);

Musseuk.displayName = 'musseuk';

export default Musseuk;
