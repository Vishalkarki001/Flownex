"use client"; // This makes the component run on the client side

import { useState, useEffect } from "react";
import Loader from "./loader"

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return isLoading ? <Loader /> : children;
}
