import CountryList from '../components/CountryList';

const Home = ({ params }) => {
  return (
    <div>
      <CountryList params={params} />
    </div>
  );
};

export default Home;
