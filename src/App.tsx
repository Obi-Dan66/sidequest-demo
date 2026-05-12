import { AppProviders } from '@/providers/AppProviders';
import { AppRouter } from '@/router';

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
