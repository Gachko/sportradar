import './App.css';
import { Layout } from './components/Layout.tsx';
import { Navbar } from './components/Navbar.tsx';
import { ScoreBoardPage } from './pages/ScoreBoard/ScoreBoard.page.tsx';

function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <ScoreBoardPage />
      </Layout>
    </>
  );
}

export default App;
