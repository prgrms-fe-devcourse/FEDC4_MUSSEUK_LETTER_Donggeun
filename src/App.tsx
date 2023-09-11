import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from './routes';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';

const App = () => {
  const { data } = useAuthCheckQuery();

  console.log(data);

  return (
    <Router>
      <Route />
    </Router>
  );
};

export default App;
