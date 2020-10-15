import axios from "axios";
import { useReducer, useEffect } from "react";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
};

const BASE_URL =
  //   "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
  "https://api.allorigins.win/raw?url=https://jobs.github.com/positions.json/";

function reducer(state, action) {
  //   action.type = "hello";
  // action.payload.x = 3;

  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };

    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
      };

    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  console.log(page);
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios
      .get(BASE_URL, {
        params: { markdown: true, page, ...params },
        cancelToken: cancelToken1.token,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    const cancelToken2 = axios.CancelToken.source();

    axios
      .get(BASE_URL, {
        params: { markdown: true, page: page + 1, ...params },
        cancelToken: cancelToken2.token,
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  //   dispatch({ type: "hello", payload: { x: 3 } });
  //   return {
  //     jobs: [],
  //     loading: false,
  //     error: false,
  //   };
  return state;
}
