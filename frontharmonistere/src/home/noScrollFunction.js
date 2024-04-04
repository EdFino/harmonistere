import React from 'react';

export default function useNoScrollFunction() {
  React.useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
}
