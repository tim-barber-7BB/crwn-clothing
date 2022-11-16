import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component'
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/Navigation/navigation.component';

const Shop = () => {
  return <h1>I am the shop</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<Authentication />} />
      </Route>
    </Routes>
  )
};

export default App;
