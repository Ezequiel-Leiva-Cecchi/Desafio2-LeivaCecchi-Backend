class ProductManager {
    constructor() {
        // Inicializa la lista de productos.
        this.products = [];
    }

    static id = 0;

    // Método para agregar productos con validación de código único.
    addProduct(title, description, price, stock, code, image) {
        // Validación: Verifica si el código del producto ya existe en la lista.
        const codeExists = this.products.find(product => product.code === code);
        if (codeExists) {
            throw new Error(`El código ${code} se está repitiendo`);
        }

        // Validación: Verifica que no haya campos undefined en el nuevo producto.
        if (title && description && price && stock && code && image) {
            // Incrementa el ID estático y agrega el nuevo producto a la lista.
            ProductManager.id++;
            this.products.push({
                id: ProductManager.id,
                title,
                description,
                price,
                stock,
                code,
                image
            });
        } else {
            throw new Error("Todos los campos son requeridos.");
        }
    }

    // Método para obtener la lista completa de productos.
    getProducts() {
        return this.products;
    }

    // Método para buscar un producto por su ID.
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        // Validación: Si el producto no se encuentra, lanza un error.
        if (!product) {
            throw new Error("No se encuentra el producto");
        } else {
            return product;
        }
    }
}

// Crear una instancia de la clase ProductManager.
const productos = new ProductManager();

// Prueba 1: Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío [].
const productsEmpty = productos.getProducts();
console.log("Prueba 1:", productsEmpty);

// Prueba 2: Se llamará al método “addProduct” con ciertos campos y se verificará que se agregue satisfactoriamente.
productos.addProduct("producto prueba", "Este es un producto prueba", 200, 25, "abc123", "Sin imagen");

// Prueba 3: Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado.
const productsAfterAdd = productos.getProducts();
console.log("Prueba 3:", productsAfterAdd);

// Prueba 4: Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
try {
    productos.addProduct("producto prueba", "Este es un producto prueba", 200, 25, "abc123", "Sin imagen");
} catch (error) {
    console.log("Prueba 4:", error.message);
}

// Prueba 5: Se evaluará que getProductById devuelva error si no encuentra el producto.
try {
    const nonExistentProduct = productos.getProductById(3);
    console.log("Prueba 5:", nonExistentProduct);
} catch (error) {
    console.log("Prueba 5:", error.message);
}

// Prueba 6: Se evaluará que getProductById devuelva el producto si lo encuentra.
const existingProduct = productos.getProductById(1); 
console.log("Prueba 6:", existingProduct);