import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store/authSlice.js';
import { setupListeners } from "@reduxjs/toolkit/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/Http/index.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [],
      },
    }),
});
setupListeners(store.dispatch);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
