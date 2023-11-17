import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { ROUTER_PATHS } from '../router/router.tsx';
import { useGetPersonDetailQuery } from '../services/apiSlice.tsx';
import { useEffect } from 'react';
import { setLoadingFlagDetails } from '../store/loadingFlagDetails.tsx';
import { useAppDispatch, useAppSelector } from '../store/redux.tsx';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const dispatchAction = useAppDispatch();
  const detailsAreLoading = useAppSelector(
    (state) => state.loadingFlagDetailsSReducer
  );

  const {
    data: detail,
    isSuccess,
    isFetching,
    isError,
  } = useGetPersonDetailQuery(id || '');

  useEffect(() => {
    if (isFetching) {
      dispatchAction(setLoadingFlagDetails(true));
    } else {
      dispatchAction(setLoadingFlagDetails(false));
    }
  }, [isFetching, dispatchAction]);

  const closeDetail = () => {
    navigate({
      pathname: ROUTER_PATHS.root,
      search: createSearchParams(queryParams).toString(),
    });
  };

  let content;

  if (detailsAreLoading.value) {
    content = <div>Details are loading...</div>;
  } else if (isSuccess) {
    content = (
      <div className="detail-container" data-testid="detail-container">
        <h1 data-testid="detail-name">Detail {detail.name}</h1>
        <div>Gender: {detail?.gender ? detail?.gender : 'unknown'}</div>
        <div>Birth Year: {detail?.birth_year}</div>
        <div>Eye Color: {detail?.eye_color}</div>
        <div>Mass: {detail?.mass}</div>
        <button data-testid="detail-close-btn" onClick={closeDetail}>
          Close
        </button>
      </div>
    );
  } else if (isError) {
    content = <div>No details. Something went wrong</div>;
  }

  return <>{content}</>;
};

export default Details;
