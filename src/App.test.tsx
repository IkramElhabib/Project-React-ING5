import { describe, it, expect } from "vitest";
import { monreducer, initializeCountries } from './App';
import GenericCard from "./GenericCard";
import {render, screen} from '@testing-library/react';


const examplePayload = [
  { name: { common: 'Eritrea' }, capital: 'Asmara', population: 2072, region: 'Oceania' },
  { name: { common: 'Denmark' }, capital: 'Copenhagen', population: '5831404', region: 'Europe' },

];

describe('Reducer Tests', () => {
  it('should handle SET_COUNTRIES action', () => {
    const initialState = { countries: [], searchResults: [] };
    const action = { type: 'SET_COUNTRIES', payload: examplePayload };
    const nextState = monreducer(initialState, action);

    const expectedState = {
      countries: [
        { name: { common: 'Eritrea' }, capital: 'Asmara', population: 2072, region: 'Oceania' },
        { name: { common: 'Denmark' }, capital: 'Copenhagen', population: '5831404', region: 'Europe' },

        
      ],
      searchResults: [
        { name: { common: 'Eritrea' }, capital: 'Asmara', population: 2072, region: 'Oceania' },
        { name: { common: 'Denmark' }, capital: 'Copenhagen', population: '5831404', region: 'Europe' },
        //{ name: { common: 'Country2' }, capital: 'Capital2', population: 'Population2', region: 'Region2' },

      ],
    };

    expect(nextState).toMatchObject(expectedState);
  });
});

/* -----------le composant genericcard---------- */


  
