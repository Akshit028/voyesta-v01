import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {  UserContext, UserContextProvider } from './UserContext';

import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Placespage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import Placepage from './pages/Placepage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

import Layout from './Layout';
import axios from 'axios';



axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<ProfilePage />} />
          <Route path="/account/places" element={<Placespage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<Placepage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
