import axios from "./axios";

export async function getProducts() {
    const { data } = await axios.get("/product-list");

    return {
        type: "GET_PRODUCTS",
        data: data,
    };
}
