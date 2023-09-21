import { Image, ImageProps } from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { MusseukType } from '@/types';
import { MUSSEUK_IMAGE } from '../constants';

type MusseukProps = {
  musseukImageName: MusseukType;
} & ImageProps;

const Musseuk = forwardRef<HTMLImageElement, MusseukProps>(
  ({ musseukImageName, ...props }: MusseukProps, ref: ForwardedRef<HTMLImageElement>) => {
    return (
      <Image
        src={MUSSEUK_IMAGE[musseukImageName]}
        alt="musseuk"
        w="90vw"
        maxW="45rem"
        h="90vw"
        maxH="45rem"
        ref={ref}
        {...props}
      />
    );
  }
);

Musseuk.displayName = 'musseuk';

export default Musseuk;
