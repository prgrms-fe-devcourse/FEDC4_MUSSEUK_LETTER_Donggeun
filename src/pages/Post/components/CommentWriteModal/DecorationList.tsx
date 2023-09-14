import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import Decoration from './Decoration';
import { DECORATION_IMAGE_NAME, DecorationType } from '../../constants';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './decoSwiper.css';
import { Dispatch, SetStateAction } from 'react';

type DecorationListProps = {
  selectedDeco: DecorationType | null;
  setSelectedDeco: Dispatch<SetStateAction<DecorationType | null>>;
};

const DecorationList = ({ selectedDeco, setSelectedDeco }: DecorationListProps) => {
  return (
    <Swiper
      slidesPerView={1}
      grid={{ rows: 2, fill: 'row' }}
      navigation
      pagination={{ clickable: true }}
      modules={[Grid, Pagination, Navigation]}
      className="deco-swiper"
      breakpoints={{
        '360': {
          slidesPerView: 2,
          grid: { rows: 2, fill: 'row' }
        },
        '540': {
          slidesPerView: 3,
          grid: { rows: 2, fill: 'row' }
        },
        '720': {
          slidesPerView: 4,
          grid: { rows: 2, fill: 'row' }
        }
      }}>
      {Object.values(DECORATION_IMAGE_NAME).map((decoId) => (
        <SwiperSlide key={decoId}>
          <Decoration decoId={decoId} selectedDeco={selectedDeco} onClick={() => setSelectedDeco(decoId)} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DecorationList;
