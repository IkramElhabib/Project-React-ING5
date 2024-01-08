import React from 'react';

interface Country {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  region: string;
}

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const { name, capital, population, region } = country;

  return (
    <div className="country-card">
      <h3>{name.common}</h3>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Region: {region}</p>
    </div>
  );
};

export default CountryCard;
