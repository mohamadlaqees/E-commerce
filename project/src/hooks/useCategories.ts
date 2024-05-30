import { loadCategories } from "@pages/Categories";
import { TCategory } from "@util/types";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const useCategories = () => {
  const data: TCategory[] = useLoaderData() as TCategory[];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories().then(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
};

export default useCategories;
