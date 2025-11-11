import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/Textform';

function App() {
  return (
    <>
      <Navbar title="TextUtils" />
      <div className="container my-3">
        <TextForm heading="Enter the text to analyze below" />
      </div>
    </>
  );
}

export default App;
