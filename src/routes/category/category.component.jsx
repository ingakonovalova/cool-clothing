import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, Fragment } from "react";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, CategoryTitle } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  // We don't want to re-initialize the products array every time component is reloaded
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>

      <CategoryContainer>
        {
          // If we are async retrieving some kind of data, then we need to add the safeguard
          // to render components only when the data has been already loaded
          products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
