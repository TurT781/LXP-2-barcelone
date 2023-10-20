import { Product } from "../entities/product.js";
export class ProductService {
    products;
    constructor() {
        this.getApi().then((x) => (this.products = x));
    }
    async getApi() {
        const query = "fiction"; // Modif query books
        const maxResults = 16; // Lim at 16 books
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`
        );
        const data = await response.json();

       
        const products = await data?.items?.map((item, index) => {
            const volumeInfo = item.volumeInfo;
            const priceInfo = item.saleInfo && item.saleInfo.listPrice;
            const price = priceInfo
                ? priceInfo.amount
                : "Out of stock";
            console.log(price.currencyCode);

            let x = new Product(

                index,
                volumeInfo?.title,
                price,
                volumeInfo.imageLinks
                    ? volumeInfo.imageLinks.thumbnail
                    : "Image not available ",
                volumeInfo.description || "no desccirption available ",
                volumeInfo.authors || ["Author unkown"]
            );

            return x
        });
        this.products = products;
        return products; 
    }

    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const test = this.products?.find((elem) => elem.id === id);
        if (test) return test;
    }
}
