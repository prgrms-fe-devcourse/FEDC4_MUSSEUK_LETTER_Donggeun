import { Text, Button, Image } from '@chakra-ui/react';
import rightarrow from '@/assets/images/rightarrow.png';
import Musseukhood from '@/assets/images/musseuk_hood.png';
import { useNavigate } from 'react-router-dom';

const MusseukButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/newpost')} display="flex" m="auto" size="lg" colorScheme="primary" mt="3.5rem">
      <Image boxSize="2.5rem" src={Musseukhood} alt="Museeukhood" />
      <Text p="2rem">나만의 머쓱이 만들기</Text>
      <Image src={rightarrow} alt="rightarrow" />
    </Button>
  );
};

export default MusseukButton;
