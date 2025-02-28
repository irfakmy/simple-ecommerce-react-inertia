import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Invalid cart data in localStorage", error);
                localStorage.removeItem("cart"); // Hapus jika data rusak
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product_id === product.product_id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (product_id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => (item.product_id === product_id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (product_id) => {
        setCart((prevCart) => prevCart.filter((item) => item.product_id !== product_id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
