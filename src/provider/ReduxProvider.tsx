"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";



interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    {children}
  </Provider>;
};

export default ReduxProvider;
