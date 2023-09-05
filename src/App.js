import logo from './logo.svg';
import './App.css';
import Header from './componemnts/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,Routes } from 'react-router-dom';
import CardsDetails from './componemnts/CardsDetails';
import Cards from './componemnts/Cards';
function App() {
  return (
    <>
  
     <Header/>

     <Routes>
      <Route path='/' element={<Cards/>}/>
      <Route path='/cart/:id' element={<CardsDetails/>}/>
     </Routes>
    </>
  );
}

export default App;
