import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import MainLayout from './routes/layout';
import Main from './pages/Main';
import Profile from './pages/Profile';
import NewPost from './pages/Newpost';
import Post from './pages/Post';

const App = () => {
  useAuthCheckQuery();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/post:postId" element={<Post />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
