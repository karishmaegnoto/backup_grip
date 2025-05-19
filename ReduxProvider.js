// app/ReduxProvider.js
"use client"; // This enables Client-side rendering for the provider

import { Provider } from "react-redux";
import { store } from "@/store/store";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
