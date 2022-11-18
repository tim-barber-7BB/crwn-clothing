import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal: total } = useContext(CartContext);
  
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'><span>Product</span></div>
        <div className='header-block'><span>Description</span></div>
        <div className='header-block'>Quantity</div>
        <div className='header-block'>Price</div>
        <div className='header-block'>Remove</div>
      </div>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        )
      })}
      <span className='total'>TOTAL: £{total}</span>
    </div>
  )
}

export default Checkout;