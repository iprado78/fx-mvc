import React from 'react';
import { Header } from './components/header/header';
import { TransactionsGrid } from './components/transactions-grid/transactions-grid';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <TransactionsGrid />
      </main>
    </>
  );
};

export default App;
