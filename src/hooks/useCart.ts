import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import type { CartItem, Kit } from "../types";

export const useCart = () => {

  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item : Kit) {
    const itemExists = cart.findIndex((kit) => kit.id === item.id)
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      const newItem : CartItem = {...item, quantity : 1}
      setCart(prevCart => [...prevCart, newItem])
    }
  }

  function removeFromCart(id : Kit['id']) {
    setCart(prevCart => prevCart.filter(kit => kit.id !== id))
  }

  function increaseQuantity(id : Kit['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id : Kit['id']) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  //State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}