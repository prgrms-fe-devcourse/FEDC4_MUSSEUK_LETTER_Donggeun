import { useRoutes } from 'react-router-dom';
import Signup from '@/pages/Signup';
import Signin from '@/pages/Signin';
import Profile from '@/pages/Profile';
import Mainpage from '@/pages/Mainpage';
import Post from '@/pages/Post';
import Newpost from '@/pages/Newpost';

export const Route = () => {
  return useRoutes([
    { path: 'signup', element: <Signup /> },
    { path: 'signin', element: <Signin /> },
    { path: 'profile/:userId', element: <Profile /> },
    { path: '/', element: <Mainpage /> },
    { path: 'post/:postId', element: <Post /> },
    { path: 'newpost', element: <Newpost /> }
  ]);
};
