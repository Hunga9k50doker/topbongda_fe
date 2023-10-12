import React, { memo } from "react";
import CardCategory from "@/components/Cards/CardCategory";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CardItemLoader } from "@/loaders";

function Categories() {
  const { categories, loading } = useSelector(
    (state: RootState) => state.categoriesStore
  );

  return (
    <>
      {loading && <CardItemLoader />}
      {categories.length > 0 &&
        categories.map((item, index) => (
          <CardCategory key={index} data={item} type="category" />
        ))}
    </>
  );
}

export default memo(Categories);
