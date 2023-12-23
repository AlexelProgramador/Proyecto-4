import { useEffect, useState } from "react";

export const LoadingText = ({ initialText }) => {
  const [loadingText, setLoadingText] = useState(initialText);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev.length >= initialText.length + 4) {
          // Añade 3 para los puntos
          return initialText;
        }
        return prev + ".";
      });
    }, 500); // Actualiza cada medio segundo

    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar
    };
  }, [initialText]);

  return <h1 className="mt-5">{loadingText}</h1>;
};
