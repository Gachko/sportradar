import { Layout, Navbar } from '@components';
import { ScoreboardPage } from '@pages';

function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <ScoreboardPage />
      </Layout>
    </>
  );
}

export default App;
