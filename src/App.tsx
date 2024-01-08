import React, { useEffect, useState } from "react";
import GenericCard from "./GenericCard";
import CountryModal from "./CountryModal";
import "./app.css";
import axios from 'axios';


const monreducer = (state : any, action: any ) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: action.payload,
        searchResults: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'INITIALIZE_COUNTRIES':
      return {
        ...state,
        countriesLoading: true,
      };
    case 'SET_COUNTRIES_SUCCESS':
      return {
        ...state,
        countriesLoading: false,
        countries: action.payload,
        searchResults: action.payload,
      };
    case 'SET_COUNTRIES_ERROR':
      return {
        ...state,
        countriesLoading: false,
        countriesError: action.payload,
      };
    default:
      return state;
  }
};

const initializeCountries = () => ({ type: 'INITIALIZE_COUNTRIES' });

interface Country {
  name: {
    common: string;
  };
  capital: string;
  population: string;
  region: string;
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 3; // Nombre d'éléments par page
  const [state, dispatchcountry] = React.useReducer(monreducer, []);
 
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        dispatchcountry({ type: 'SET_COUNTRIES_SUCCESS', payload: response.data });
        setSearchResults(response.data);
      } catch (error : any) {
        dispatchcountry({ type: 'SET_COUNTRIES_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);

 
  
  useEffect(() => {
    console.log("lading encours:", state);
  }, [state]);
  
  useEffect(() => {
    console.log("Countries State:", state.countries);
  }, [state.countries]);

  useEffect(() => {
    console.log("Search Term State:", state.searchTerm);
  }, []);

  useEffect(() => {
    console.log("Countries Loading State:", state.countriesLoading);
  }, []);

  useEffect(() => {
    console.log("Countries Success State:", state.countries);
  }, [state.countries]);

  useEffect(() => {
    console.log("Countries Error State:", state.countriesError);
  }, []);
  useEffect(() => {
    
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCountries = filteredCountries.sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    setSearchResults(sortedCountries);
  }, [countries, searchTerm, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleDetailsClick = (country: Country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const closeCountryDetails = () => {
    setSelectedCountry(null);
  };

  // Fonction pour calculer l'indice de début de la page actuelle
  const startIndex = (currentPage - 1) * pageSize;
  // Slice les résultats pour obtenir la page actuelle
  const paginatedResults = searchResults.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div>
      <h1>List of Countries</h1>
      <div>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSort}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="card-container">
        {paginatedResults.map((country) => (
          <div key={country.name.common} className="card">
            <GenericCard
              title={country.name.common}
              content={
                <>
                  <p>Capital: {country.capital}</p>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  {/* Add other specific country information here */}
                </>
              }
              onClick={() => handleCountryClick(country)}
              onDetailsClick={() => handleDetailsClick(country)}
              customStyle={{ backgroundColor: "green", width: "100%" }} // Exemple de style personnalisé
            >
              <button onClick={() => handleDetailsClick(country)}>
                Details
              </button>
            </GenericCard>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() =>
            setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(searchResults.length / pageSize)))
          }
          disabled={currentPage === Math.ceil(searchResults.length / pageSize)}
        >
          Next Page
        </button>
      </div>

      {selectedCountry && (
        <div>
          <h2>Country Details</h2>
          <p>Name: {selectedCountry.name.common}</p>
          {/* Add other details here */}
          <button onClick={closeCountryDetails}>Close</button>
        </div>
      )}
    </div>
  );
}
export {monreducer, initializeCountries};
export default App;
