import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Button, Card } from '@mui/material';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    navigate('/success');
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" style={{ marginTop: '20px' }}>
        Cart: {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
      </Typography>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={8}>
          {cartItems.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ padding: '20px' }}>
            <Typography variant="h6">Total products: {totalQuantity}</Typography>
            <Typography variant="h5">Total price: ${totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
              Proceed to Buy
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
