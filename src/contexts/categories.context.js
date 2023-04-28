import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import PRODUCTS from "../shop-data";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

// The actual value you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
  setProducts: () => null,
});

// Like some alias component that gives us a way how to access ProductContext
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // How we added data to the DB
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", PRODUCTS);
  // }, []);

  useEffect(() => {
    // Any async things that need to be done inside the useEffect, should be wrapped in
    // an async function and not added directly to the useEffect as a callback
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
