import React, { useEffect } from "react";
import { Container, Grid, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setProducts } from "../redux/slices/productSlice";
import { setCategories } from "../redux/slices/categorySlice";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategoryList from "../components/CategoryList";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.items);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
    };

    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      dispatch(setCategories(data));
    };

    fetchProducts();
    fetchCategories();
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Box sx={{ marginY: 3 }}>
        <CategoryList categories={categories} />
      </Box>
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
