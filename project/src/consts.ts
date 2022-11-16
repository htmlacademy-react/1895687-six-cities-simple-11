export enum AppRoute{
  Main = '/',
  Login = '/login',
  Room = '/offer',
  Other = '*'
}

export enum AuthorisationStatus{
  Auth = 'AUTH',
  Unauth = 'UNAUTH',
  Unknown = 'UNKNOWN'
}

export enum MapMarkerUrl{
  Default = '../img/pin.svg',
  Current = '../img/pin-active.svg'
}

export const RatingTitle = {
  1 : 'terribly',
  2 : 'badly',
  3 : 'not bad',
  4 : 'good',
  5 : 'perfect'
} as const;

const RAITING_MAX = 5;
const LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export {RAITING_MAX, LAYER_URL, LAYER_ATTRIBUTION};
