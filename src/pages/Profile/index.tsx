import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>Profile page</h1>
      {userId}의 profile
    </>
  );
};

export default Profile;
