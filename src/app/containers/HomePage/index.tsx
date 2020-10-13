import React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
      </Helmet>
      <span>HomePage right here</span>
    </>
  );
}
