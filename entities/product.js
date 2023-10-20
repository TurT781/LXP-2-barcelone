export class Product {
    id;
    title;
    price;
    image;
    description;
    author;
    constructor(id, title, price, image, description, author) {
      this.id = id;
      this.description = description;
      this.title = title;
      this.price = price;
      this.image = image;
      this.author = author;
    }
  }