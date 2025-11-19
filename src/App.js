import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/Textform';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
    <>
      <Navbar title="TextUtils" />
      <div className="container my-3">
        <TextForm heading="Enter the text to analyze below" />
      </div>
    </>
    </ThemeProvider>
  );
} 

export default App;
