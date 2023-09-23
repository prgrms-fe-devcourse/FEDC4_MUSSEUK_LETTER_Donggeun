import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import { DECORATION_IMAGE_NAME } from 'common/constants/imageNames';
import Decoration from './Decoration';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './decoSwiper.css';
import { Box, BoxProps, Input, useRadioGroup } from '@chakra-ui/react';
import { Dispatch, ForwardedRef, SetStateAction, forwardRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { CommentField, DecorationType } from 'common/types';

type DecorationListProps = {
  isError: boolean;
  setValue: UseFormSetValue<CommentField>;
  setIsError: Dispatch<SetStateAction<boolean>>;
} & BoxProps;

const DecorationList = forwardRef<HTMLInputElement, DecorationListProps>(
  ({ isError, setValue, setIsError }: DecorationListProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { getRadioProps, getRootProps } = useRadioGroup({
      name: 'decorationImageName',
      onChange: (value) => {
        setValue('decorationImageName', value as DecorationType);
        setIsError(false);
      }
    });

    const group = getRootProps();

    return (
      <Box id="decorationImageName" w={'100%'} position={'relative'} {...group}>
        <Input
          ref={ref}
          isReadOnly
          position={'absolute'}
          top={'-0.5rem'}
          left={'5%'}
          w={'90%'}
          h={'17rem'}
          border={isError ? '2px' : 'none'}
          borderRadius={'10px'}
          borderColor={'orange.400'}
          focusBorderColor="orange.400"
          textColor={'transparent'}
        />
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
          {Object.values(DECORATION_IMAGE_NAME).map((decoId) => {
            const radio = getRadioProps({ value: decoId });
            return (
              <SwiperSlide key={decoId}>
                <Decoration decoId={decoId} {...radio} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    );
  }
);

DecorationList.displayName = 'DecorationList';

export default DecorationList;
