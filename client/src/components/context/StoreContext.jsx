import { createContext, useEffect, useState } from "react"
// import { food_list } from "../../assets/assets"
import axios from "axios"


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [ cartItems, setCartItems ] = useState({});
    const url = "http://127.0.0.4:4000"
    const [ token, setToken ] = useState("")
    const [ food_list, setFoodList ] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }
        else {
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
        
        if(token) {
            try {
                await axios.post(url+"/api/cart/add", {itemId}, {headers: {token} } )
            }
            catch(error) {
                console.log("Error adding to cart:", error);
            }
        }
    }




    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } 
            catch (error) {
                console.log("Error removing from cart:", error);
            }
        }
    };
    
    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item]>0) {
                // Find itemInfo in food_list based on itemId
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) { // Ensure itemInfo exists before accessing its properties
                    totalAmount += itemInfo.price * cartItems[item];
                }
                else {
                    console.log(`Item with itemId ${item} not found in food_list`);
                }    
            }    
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list");
            setFoodList(response.data.data)
        }
        catch(error) {
            console.log("Error fetching food list:", error);
        }
    
    }

    const loadCartData = async(token) => {
        try {
            const response = await axios.post(url+"/api/cart/get", {}, {headers: {token} } );
            setCartItems(response.data.cartData)
        }
        catch(error) {
            console.log("Error loading cart data:", error);
        }
    }


    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])


    // It will excute only once after initial render
    // So, If I refresh the page it will re-load/ re-render the page but it will hold the token using this (React Licycle)
    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))

                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            { props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider