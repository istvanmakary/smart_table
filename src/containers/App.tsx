import { useAsync } from 'react-use';
import { CircularProgress } from '@mui/material';
import { Data } from '../types';
import TableWithFilter from './TableWithFilter';

const App = () => {
  const { value, loading } = useAsync(
    (): Promise<Data> =>
      fetch('https://data.sfgov.org/resource/yitu-d5am.json').then((response) =>
        response.json()
      ),
    []
  );

  if (loading) {
    return <CircularProgress />;
  }

  return value ? <TableWithFilter data={value} /> : null;
};

export default App;
