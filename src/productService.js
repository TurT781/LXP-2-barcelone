import { Product } from "../entities/product.js";
export class ProductService {
    products;
    constructor() {
        this.getApi().then((x) => (this.products = x));
    }
    async getApi() {
        const query = "fiction"; // Recherche de livres fantastiques
        const maxResults = 16; // Limite le nombre de résultats à 8
        // Utilisez `await` pour attendre que la requête soit résolue
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`
        );
        const data = await response.json();

        // Transformez les données en instances de la classe Product
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
                    : "Image non disponible",
                volumeInfo.description || "Aucune description disponible",
                volumeInfo.authors || ["Auteur inconnu"]
            );

            return x
        });
        this.products = products;
        return products; // Renvoie les données sous forme de tableau
    }

    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const test = this.products?.find((elem) => elem.id === id);
        if (test) return test;
    }
}
