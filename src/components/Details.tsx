import { useEffect, useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { SWAPI, SWPerson } from '../services/SWAPI.tsx';
import { ROUTER_PATHS } from '../router/router.tsx';

const Details = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SWPerson>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const SWService = new SWAPI();

  const closeDetail = () => {
    navigate({
      pathname: ROUTER_PATHS.root,
      search: createSearchParams(queryParams).toString(),
    });
  };

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
          <h1 data-testid="detail-name">Detail {data.name}</h1>
          <div>Gender: {data?.gender ? data?.gender : 'unknown'}</div>
          <div>Birth Year: {data?.birth_year}</div>
          <div>Eye Color: {data?.eye_color}</div>
          <div>Mass: {data?.mass}</div>
          <button onClick={closeDetail}>Close</button>
        </div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <div>No details</div>
      )}
    </>
  );
};

export default Details;
