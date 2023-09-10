import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
        @font-face {
            font-family: 'netmarble';
            font-weight: 300;
            src: url('@/fonts/netmarbleL.ttf');
        }
  
        @font-face {
            font-family: 'netmarble';
            font-weight: 500;
            src: url('@/fonts/netmarbleM.ttf');
        }

        @font-face {
            font-family: 'netmarble';
            font-weight: normal;
            src: url('@/fonts/netmarbleM.ttf');
        }
  
        @font-face {
            font-family: 'netmarble';
            font-weight: 700;
            src: url('@/fonts/netmarbleB.ttf');
        }
  `}
  />
);

export default Fonts;
