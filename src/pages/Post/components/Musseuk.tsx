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
        w="80vw"
        maxW="40rem"
        h="80vw"
        maxH="40rem"
        objectFit={'cover'}
        ref={ref}
        {...props}
      />
    );
  }
);

Musseuk.displayName = 'musseuk';

export default Musseuk;
