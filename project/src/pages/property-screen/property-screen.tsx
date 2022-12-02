import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from '../../components/comments-list/comments-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Navigation from '../../components/navigation/navigation';
import OffersList from '../../components/offers-list/offers-list';
import ReviewForm from '../../components/review-form/review-form';
import { MapClassList } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { selectPoint } from '../../store/actions';
import { getComments, getOffersNearby, getTheOffer } from '../../store/thunk-actions';
import AuthorisationStatus from '../../types/authorisation-status';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type PropertyScreenProps = {
  cardsCount: number;
}

function PropertyScreen({cardsCount}:PropertyScreenProps):JSX.Element{
  const dispatch = useAppDispatch();
  const {authorisationStatus} = useAppSelector((state)=>state);
  const isAuthorised = authorisationStatus === AuthorisationStatus.Auth;
  const {isLoading} = useAppSelector((state)=>state);
  const {offer} = useAppSelector((state)=>state);
  const offersNearby = useAppSelector((state)=>state.offersNearby).slice(0,cardsCount);
  const {comments} = useAppSelector((state)=>state);
  const params = useParams();
  const offerId = Number(params.id);

  useEffect(()=>{
    if(isNaN(offerId)){ return; }
    dispatch(getTheOffer(offerId));
    dispatch(getComments(offerId));
    dispatch(getOffersNearby(offerId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[offerId]);

  if(isLoading){
    return <LoadingSpinner/>;
  }

  if (offer === null || isNaN(offerId)) {return <NotFoundScreen/>;}

  const {city, location, id} = offer;
  dispatch(selectPoint(location));
  const points = offersNearby.map((item) => item.location).concat(location);

  return(
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <Navigation/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                <img className="property__image" src="img/room.jpg" alt="Apartment"/>
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Apartment"/>
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-02.jpg" alt="Apartment"/>
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-03.jpg" alt="Apartment"/>
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/studio-01.jpg" alt="Apartment"/>
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Apartment"/>
              </div>
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  Beautiful &amp; luxurious studio at great location
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{
                    width: '80%'
                  }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Apartment
                </li>
                <li className="property__feature property__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;120</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  <li className="property__inside-item">
                    Wi-Fi
                  </li>
                  <li className="property__inside-item">
                    Washing machine
                  </li>
                  <li className="property__inside-item">
                    Towels
                  </li>
                  <li className="property__inside-item">
                    Heating
                  </li>
                  <li className="property__inside-item">
                    Coffee machine
                  </li>
                  <li className="property__inside-item">
                    Baby seat
                  </li>
                  <li className="property__inside-item">
                    Kitchen
                  </li>
                  <li className="property__inside-item">
                    Dishwasher
                  </li>
                  <li className="property__inside-item">
                    Cabel TV
                  </li>
                  <li className="property__inside-item">
                    Fridge
                  </li>
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <CommentsList comments={comments}/>
                {isAuthorised ? <ReviewForm hotelId={id}/> : null}
              </section>
            </div>
          </div>
          <Map className={MapClassList.Property} city={city} points={points}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersNearby} isForNearPlaces/>
          </section>
        </div>
      </main>
    </>
  );
}

export default PropertyScreen;
