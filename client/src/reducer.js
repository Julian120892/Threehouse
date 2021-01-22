export function reducer(state = {}, action) {
    ///////GET PRODUCTS/////////
    if (action.type == "GET_PRODUCTS") {
        console.log("action.data in reducer ", action.data);
        const product = action.data.filter((product) => {
            if (product.product_name) {
                return {
                    ...product,
                };
            }
        });

        state = {
            ...state,
            products: product,
        };
    }
    console.log("state in reducer", state);

    ///////
    return state;
}
