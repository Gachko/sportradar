import './App.css';
import { Layout } from './components/Layout.tsx';
import { Navbar } from './components/Navbar.tsx';
import { ScoreboardPage } from './pages/ScoreBoard/Scoreboard.page.tsx';

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
