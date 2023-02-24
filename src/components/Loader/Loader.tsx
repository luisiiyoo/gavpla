import React, { useEffect } from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  useEffect(() => {
    const loading = document.querySelector('.Loader') as Element;
    if (loading !== null) {
      const loadingMsg = loading.textContent || '';
      const letters = loadingMsg.split('');
      loading.textContent = '';
      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.className = 'Loader-Span';
        span.textContent = letter;
        span.style.animationDelay = `${i / loadingMsg.length}s`;
        loading.append(span);
      });
    }
  }, []);
  return <div className="Loader">Loading...</div>;
};

export default Loader;
