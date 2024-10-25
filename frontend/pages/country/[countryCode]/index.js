import CountryInfo from '../../../components/CountryInfo';
import { useRouter } from 'next/router';

const CountryDetail = () => {
  const router = useRouter();
  const { countryCode } = router.query;

  return (
    <div>
      <CountryInfo countryCode={countryCode} />{' '}
    </div>
  );
};

export default CountryDetail;
