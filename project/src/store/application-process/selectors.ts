import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import NameSpace from '../../types/name-space';
import sortOffers from '../../utils/sort-offers';
import filterOffers from '../../utils/filter-offers';
import { getOffers } from '../application-data/selectors';

export const getSelectedPoint = (state:State) => state[NameSpace.Application].selectedPoint;

export const getSortType = (state:State) => state[NameSpace.Application].sortType;

export const getChosenCity = (state:State) => state[NameSpace.Application].chosenCity;

export const getOffersData = createSelector(
  [getOffers, getSortType, getChosenCity],
  (offers, sortType, chosenCity) => ({
    offers: sortOffers[sortType](filterOffers(offers, chosenCity)),
    chosenCity
  })
);
