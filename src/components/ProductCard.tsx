import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { AddShoppingCart, Add, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.product.id === product.id)
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: cartItem!.quantity + 1 }));
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem!.quantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: cartItem!.quantity - 1 }));
    } else {
      dispatch(removeFromCart({ id: product.id }));
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: 'contain',
            width: '100%',
            height: '180px', 
            marginBottom: 2,
          }}
        />
      </Box>
      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            marginBottom: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.title}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        {cartItem ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleDecrease} aria-label="decrease quantity" color="primary">
              <Remove />
            </IconButton>
            <Typography>{cartItem.quantity}</Typography>
            <IconButton onClick={handleIncrease} aria-label="increase quantity" color="primary">
              <Add />
            </IconButton>
          </Box>
        ) : (
          <IconButton onClick={handleAddToCart} aria-label="add to cart" color="primary">
            <AddShoppingCart />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
