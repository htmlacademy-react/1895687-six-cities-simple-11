import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import Advert from '../../types/advert';

type AppProps = {
  offersCount: number;
  offers: Advert[];
  defaultCardsCount: number;
  nearPlacesCardsCount: number;
}

function App({offersCount, offers, defaultCardsCount, nearPlacesCardsCount}: AppProps): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = {AppRoute.Main} element = {<MainScreen offersCount={offersCount} offers={offers} defaultCardsCount={defaultCardsCount}/>}/>
        <Route path = {AppRoute.Login} element = {<LoginScreen/>}/>
        <Route path = {`${AppRoute.Room}/:id`} element = {<PropertyScreen offers={offers} cardsCount={nearPlacesCardsCount}/>}/>
        <Route path = {AppRoute.Other} element = {<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
