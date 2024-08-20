import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';

interface CartItemProps {
  item: {
    product: {
      id: number;
      title: string;
      price: number;
      image: string;
    };
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }));
    } else {
      if (window.confirm('Remove this item from the cart?')) {
        dispatch(removeFromCart({ id: item.product.id }));
      }
    }
  };

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <img src={item.product.image} alt={item.product.title} style={{ width: '100px' }} />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Typography variant="h6">{item.product.title}</Typography>
            <Typography variant="body2">${item.product.price.toFixed(2)}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={3}>
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <Typography variant="body2" display="inline">
            {item.quantity}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
