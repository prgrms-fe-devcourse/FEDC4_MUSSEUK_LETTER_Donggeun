import { Image, Box } from '@chakra-ui/react';
import musseuk_semicolon from '@/assets/images/musseuk_semicolon.png';

const MusseukImage = () => {
  return (
    <>
      <Image
        margin={{
          base: 'auto',
          lg: 'initial'
        }}
        position={{
          base: 'initial',
          lg: 'absolute'
        }}
        w={{
          base: '90%',
          lg: '40rem'
        }}
        h={{
          base: 'auto',
          lg: '30rem'
        }}
        top="3.3rem"
        right="1rem"
        src={musseuk_semicolon}
        alt="musseuk_semicolon"
      />
      <Box
        height={{
          base: '0',
          lg: '10rem',
          '2xl': '0'
        }}
      />
    </>
  );
};

export default MusseukImage;
