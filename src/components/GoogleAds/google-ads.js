import React, {useEffect} from 'react';

export default () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adsbygoogle = window.adsbygoogle || [];
      adsbygoogle.push({});
    }
  });

  return (
    <ins
      className='adsbygoogle'
      style={{display: 'block', textAlign: 'center'}}
      data-ad-layout='in-article'
      data-ad-format='fluid'
      data-ad-client='ca-pub-2579002527179937'
      data-ad-slot='9096841418'
    />
  );
};
