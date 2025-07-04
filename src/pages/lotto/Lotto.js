// src/App.js
import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import RecommendNumber from '../../components/lotto/RecommendNumber';

function Lotto() {
  return (
    <DefaultLayout>
      <RecommendNumber />
    </DefaultLayout>
  );
}

export default Lotto;