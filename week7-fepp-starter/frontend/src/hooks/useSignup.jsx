import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    const user = await response.json();

    if (!response.ok) {
      setError(user.error);
      setIsLoading(false);
      return user.error; 
    }

    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
    return null;
  };

  return { signup, isLoading, error };
}
