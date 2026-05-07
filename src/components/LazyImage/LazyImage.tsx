import React, { useEffect, useRef } from 'react';

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const LazyImage: React.FC<LazyImageProps> = (props) => {
  const { alt = '', ...rest } = props;
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    // Use native browser lazy loading even on older TS DOM typings.
    imgRef.current.setAttribute('loading', 'lazy');
    imgRef.current.setAttribute('decoding', 'async');
  }, []);

  return <img ref={imgRef} alt={alt} {...rest} />;
};

export default LazyImage;
