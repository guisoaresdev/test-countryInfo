import Link from 'next/link';
import { useEffect, useState } from 'react';
import PopulationChart from './PopulationChart';

const CountryInfo = ({ countryCode }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (countryCode) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/countries/${countryCode}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCountryInfo(data);
        } catch (error) {
          console.error('Error fetching country info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  if (loading) return <p>Loading...</p>;
  if (!countryInfo) return <p>No data found.</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{countryInfo.commonName}</h1>
      <img
        src={countryInfo.flag}
        alt={`${countryInfo.commonName} flag`}
        className="w-full max-w-xs mb-4"
      />
      <h2 className="text-xl font-semibold">Border Countries</h2>
      <ul className="list-disc pl-5 mb-4">
        {countryInfo.borders &&
          countryInfo.borders.map((border) => (
            <li key={border.countryCode} className="my-2">
              <Link
                href={`/country/${border.countryCode}`}
                className="text-blue-500 hover:underline"
              >
                {border.commonName}
              </Link>
            </li>
          ))}
      </ul>
      <div className="w-full h-64 md:h-80">
        <PopulationChart populationData={countryInfo.population} />
      </div>
    </div>
  );
};

export default CountryInfo;
