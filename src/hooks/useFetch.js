import { sendRequest } from "@/utils/api";

import { useCallback, useEffect, useState } from "react";

const useFetch = (
  apiConfig,
  {
    immediate = false,

    mappingData,

    params: immediateParams, // use this field with immediate = true
  } = {}
) => {
  const [loading, setLoading] = useState(immediate);

  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  const execute = useCallback(
    async ({ onCompleted, onError, params } = {}) => {
      setLoading(true);

      setError(null);

      try {
        const { responseData } = await sendRequest(
          apiConfig,
          params || immediateParams
        );

        if (!responseData.result) {
          throw responseData;
        }

        setData(mappingData ? mappingData(responseData) : responseData);

        onCompleted && onCompleted(responseData);

        return responseData;
      } catch (error) {
        setError(error);

        onError && onError(error);

        return error;
      } finally {
        setLoading(false);
      }
    },
    [apiConfig]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { loading, execute, data, error, setData };
};

export default useFetch;
