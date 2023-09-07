import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>Profile</h1>
      {userId}의 Profile
    </>
  );
};

export default Profile;
