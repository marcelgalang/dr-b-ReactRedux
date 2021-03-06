import { combineReducers } from 'redux'
import cart, * as fromCart from '../Cart'
import products, * as fromProducts from '../Products'
import carts from '../Carts'
import counter from '../Product'

export default combineReducers({
  cart,
  products,
  carts,
  counter
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getAddedExternalId = state => fromCart.addedExternalId(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)


export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getExternalId = state =>
  getAddedExternalId(state).slice(-1).pop()

export const getTotalQuantity = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + 1 * getQuantity(state, id),
      0
    )

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))
