import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'netmarble';
        font-weight: 300;
        src: url('/src/assets/fonts/netmarbleL.ttf');
      }

      @font-face {
        font-family: 'netmarble';
        font-weight: 500;
        src: url('/src/assets/fonts/netmarbleM.ttf');
      }

      @font-face {
        font-family: 'netmarble';
        font-weight: normal;
        src: url('/src/assets/fonts/netmarbleM.ttf');
      }

      @font-face {
        font-family: 'netmarble';
        font-weight: 700;
        src: url('/src/assets/fonts/netmarbleB.ttf');
      }
  `}
  />
);

export default Fonts;
