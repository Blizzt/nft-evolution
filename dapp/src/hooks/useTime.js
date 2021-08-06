// Dependencies
import React from 'react';

function useTime() {
  const [currentTime, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return currentTime;
};

export default useTime;
