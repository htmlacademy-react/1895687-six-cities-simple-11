import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import NameSpace from '../../types/name-space';
import sortOffers from '../../utils/sort-offers';
import filterOffers from '../../utils/filter-offers';

export const getSelectedPoint = (state:State) => state[NameSpace.Application].selectedPoint;

export const getSortType = (state:State) => state[NameSpace.Application].sortType;

export const getChosenCity = (state:State) => state[NameSpace.Application].chosenCity;

export const getFormatedOffers = createSelector(
  (state:State) => ({
    offers: state[NameSpace.Data].offers,
    sortType: state[NameSpace.Application].sortType,
    chosenCity: state[NameSpace.Application].chosenCity
  }),
  ({offers, sortType, chosenCity}) => sortOffers[sortType](filterOffers(offers, chosenCity))
);