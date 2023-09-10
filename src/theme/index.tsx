import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#8CD790',
      600: '#48BB78',
      700: '#38A169'
    },
    green01: '#8CD790',
    green02: '#71D258',
    green03: '#48BB78',
    red01: '#DD1D1D',
    bg01: '#F9F9F4',
    gray01: '#F7F7f7',
    gray02: '#DDDFDA',
    gray03: '#BABCB4',
    blue01: '#E2E8F0',
    blue02: '#A0AEC0',
    blue03: '#718096',
    black01: '#000000'
  },
  fonts: {
    heading: 'netmarble',
    body: 'netmarble',
    mono: 'netmarble'
  }
});

export default theme;
