import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={470}
      viewBox="0 0 280 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="134" cy="127" r="125" />
      <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
      <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="430" rx="10" ry="10" width="95" height="30" />
      <rect x="130" y="421" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
  </div>
);

export default Skeleton;
