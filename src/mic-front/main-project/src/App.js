import { Router, Link } from '@reach/router'
import './App.css';
import Home from './home'
import Layout from './layout'
function App() {
  return (
    <div className="">
      <header className="">
        react parent app
      </header>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/reactApp">children</Link> |{" "}
        <Link to="/reactApp2">children2</Link>
      </nav>
      <Router>
        <Home path="/" />
      </Router>
      <Layout />
    </div>
  );
}

export default App;
