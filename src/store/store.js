import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarSlice';
import serviceReducer from './serviceSlice';

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    service: serviceReducer,
  },
});

if (import.meta.env.DEV) {
  // expose for quick debugging in browser console
  window.__STORE__ = store;
  window.__getState = () => store.getState();
  window.__dispatch = store.dispatch;
}

export default store;
