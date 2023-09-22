import { StyleFunctionProps, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    base: '0em', // 0px
    '2xs': '12em', // ~192px
    xs: '25em', // ~400px
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font size.
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
    '2xl': '96em' // ~1536px
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: 'default',
        bg: 'bg01'
      }
    })
  },
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
