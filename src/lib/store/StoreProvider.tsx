'use client';
import { useState } from 'react';
import { Provider, createStore } from 'jotai';

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => createStore());
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;