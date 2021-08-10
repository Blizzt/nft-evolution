// Dependencies
import { useLayoutEffect, useState } from 'react';
import API from '../../../api';

function FetchIPFS({ id, onComplete = null, onLoading = null, onError = () => {} }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true);
    console.log({ id });
    API.getFromIPFS(id).then(({ data }) => {
      setData(data);
      setIsLoading(false);
    }).catch((e) => {
      console.error(e);
    });
  }, [id]);

  return isLoading ? onLoading : onComplete(data);
}

export default FetchIPFS;
