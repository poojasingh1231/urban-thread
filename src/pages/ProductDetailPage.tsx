import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/slices/cartSlice';
import Header from '../components/Header';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(productId))
  );
  
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.product.id === Number(productId))
  );
  
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, padding: 0 }}>
      <Header />

      {/* Product Image */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%', // Ensure the box uses full width
          backgroundColor: '#f5f5f5',
          padding: 2, // Maintain padding for spacing
          marginBottom: 4,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center', // Center the image
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px', // Ensure a minimum height for the box
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '60vh', // Constrain the height to fit within the screen
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        ) : (
          <Typography variant="h6">Image not available</Typography>
        )}
      </Box>

      {/* Product Details Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {product.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4, color: '#555' }}>
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary">
            ${product.price}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {cartItem ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                {`In Cart: ${cartItem.quantity}`}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ padding: '10px 50px' }}
                onClick={handleAddToCart}
              >
                ADD MORE
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: '10px 50px' }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
