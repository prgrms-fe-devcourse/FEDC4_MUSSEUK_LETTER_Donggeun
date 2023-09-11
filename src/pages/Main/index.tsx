import Header from '@/components/header';
import { useRef, useState } from 'react';
import Musseuk from '@/assets/images/musseuk_semicolon.png';
import Museeukhood from '@/assets/images/musseuk_hood.png';
import rightarrow from '@/assets/images/rightarrow.png';
import { useNavigate } from 'react-router-dom';
import {
  ButtonGroup,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Card,
  CardBody,
  Center,
  Square,
  Box,
  Flex,
  Spacer,
  Image,
  Text,
  Button,
  WrapItem
} from '@chakra-ui/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Main = () => {
  const navigate = useNavigate();

  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(25);
  const prependNumber = useRef(1);
  const [slides, setSlides] = useState(Array.from({ length: 25 }).map((_, index) => `Slide ${index + 1}`));

  return (
    <>
      <h1>Main page</h1>
    </>
  );
};

export default Main;
