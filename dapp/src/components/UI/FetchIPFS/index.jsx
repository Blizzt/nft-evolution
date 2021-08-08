// Dependencies
import React, { useLayoutEffect, useState } from 'react';
import API from '../../../api';

function FetchIPFS({ id, onComplete = () => {}, onLoading = () => {}, onError = () => {} }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true);
    API.getNFTById(id).then((uri) => {
      API.getFromIPFS(uri).then(({ data }) => {
        setData(data);
        setIsLoading(false);
      }).catch((e) => {
        console.error(e);
      });
    });
  }, [id]);

  return (
    <>
      {isLoading ? onLoading() : onComplete(data)}
    </>
  );
}

export default FetchIPFS;
