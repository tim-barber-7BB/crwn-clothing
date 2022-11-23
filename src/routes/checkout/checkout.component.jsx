import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartTotal, selectCartItems } from '../../store/cart/cart.selectors';

import './checkout.styles.scss';

const Checkout = () => {
  const total = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  
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