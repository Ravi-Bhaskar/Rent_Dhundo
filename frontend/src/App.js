import "./App.css";
import Layout from "./components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
     <Layout />
    <Toaster 
    position="bottom-right"
    reverseOrder={false} />
    </>
  )
}

export default App;
