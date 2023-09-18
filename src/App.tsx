import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import MainLayout from './routes/layout';
import Main from './pages/Main';
import Profile from './pages/Profile';
import NewPost from './pages/Newpost';
import Post from './pages/Post';
import Search from './pages/Search';
import ChangePassword from './pages/ChangePassword';
import SettingSlack from './pages/Setting/Slack';
import NotFound from './pages/NotFound';

const App = () => {
  useAuthCheckQuery();

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/setting/slack" element={<SettingSlack />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
