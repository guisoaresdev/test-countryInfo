import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PopulationChart from './PopulationChart';

const CountryInfo = () => {
  const router = useRouter();
  const { code } = router.query;
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (code) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/countries/${code}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data); // Para depuração
          setCountryInfo(data);
        } catch (error) {
          console.error('Error fetching country info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (loading) return <p>Loading...</p>;

  if (!countryInfo) return <p>No data found.</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{countryInfo.commonName}</h1>
      <img
        src={countryInfo.flag}
        alt={`${countryInfo.commonName} flag`}
        className="w-32 mb-4"
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
      <PopulationChart populationData={countryInfo.populationData || []} />
    </div>
  );
};

export default CountryInfo;
