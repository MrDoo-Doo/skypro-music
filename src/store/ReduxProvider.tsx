'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { makeStore, AppStore } from './store';

// export default function ReduxProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore>(null);
//   const [store, setStore] = useState<AppStore>();

//   useEffect(() => {
//     if (!storeRef.current) {
//       storeRef.current = makeStore();
//       setStore(storeRef.current);
//     }
//   }, []);

//   return store ? <Provider store={store}>{children}</Provider> : null;
// }
