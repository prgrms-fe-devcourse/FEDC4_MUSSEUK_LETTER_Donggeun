import { BrowserRouter as Router } from 'react-router-dom';
import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import { Route } from './routes';

const App = () => {
  useAuthCheckQuery();

  return (
    <Router>
      <Route />
    </Router>
  );
};

export default App;
