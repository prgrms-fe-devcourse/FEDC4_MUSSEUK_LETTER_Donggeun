import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import Decoration from './Decoration';
import { DECO_ID } from '../../constants';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './decoSwiper.css';

const DecorationList = () => {
  return (
    <Swiper
      slidesPerView={1}
      grid={{ rows: 2, fill: 'row' }}
      navigation
      pagination={{ clickable: true }}
      modules={[Grid, Pagination, Navigation]}
      className="deco-swiper"
      breakpoints={{
        '@0.75': {
          slidesPerView: 2,
          grid: { rows: 2, fill: 'row' }
        },
        '@1.00': {
          slidesPerView: 3,
          grid: { rows: 2, fill: 'row' }
        },
        '@1.25': {
          slidesPerView: 4,
          grid: { rows: 2, fill: 'row' }
        }
      }}>
      {Object.values(DECO_ID).map((decoId) => (
        <SwiperSlide key={decoId}>
          <Decoration decoId={decoId} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DecorationList;
