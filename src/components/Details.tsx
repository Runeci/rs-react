import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SWAPI, SWPerson } from '../services/SWAPI.tsx';

const MyComponent = () => {
  const [data, setData] = useState<SWPerson>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const SWService = new SWAPI();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setData(undefined);
      SWService.getPersonDetail(id).then((r) => {
        setData(r);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {data ? (
        <div>
          <h1>Detail {data.name}</h1>
          <div>Gender: {data?.gender ? data?.gender : 'unknown'}</div>
          <div>Birth Year: {data?.birth_year}</div>
          <div>Eye Color: {data?.eye_color}</div>
          <div>Mass: {data?.mass}</div>
          <Link to={'/'}>
            <button>Close</button>
          </Link>
        </div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <div>No details</div>
      )}
    </>
  );
};

export default MyComponent;
