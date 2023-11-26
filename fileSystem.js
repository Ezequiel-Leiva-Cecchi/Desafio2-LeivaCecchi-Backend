// Importa el módulo fs de Node.js para trabajar con el sistema de archivos.
import { promises as fs } from "fs";

// Clase ProductManager para gestionar productos.
class ProductManager {
    // Constructor que inicializa la ubicación del archivo y la lista de productos.
    constructor() {
        this.patch = "./products.txt";  // Ruta del archivo de productos.
        this.products = [];  // Lista de productos.
    }

    // Atributo estático para generar IDs únicos.
    static id = 0;

    // Método para agregar un producto.
    addProduct = async (title, description, price, stock, code, image) => {
        ProductManager.id++;

        // Crea un nuevo objeto de producto.
        let nuevosProducts = {
            title,
            description,
            price,
            stock,
            code,
            image,
            id: ProductManager.id
        };

        // Agrega el nuevo producto a la lista.
        this.products.push(nuevosProducts);

        // Escribe la lista de productos en el archivo.
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    // Método para leer los productos desde el archivo.
    readProducts = async () => {
        try {
            let answer = await fs.readFile(this.patch, "utf-8");

            // Verifica si el contenido del archivo está vacío.
            if (!answer.trim()) {
                return [];
            }

            // Parsea el contenido del archivo como JSON.
            return JSON.parse(answer);
        } catch (error) {
            // Maneja errores al leer o analizar el archivo.
            console.error("Error al leer o analizar el archivo:", error.message);
            return [];
        }
    };

    // Método para obtener la lista completa de productos.
    getProducts = async () => {
        let secondAnswer = await this.readProducts();
        return secondAnswer;
    };

    // Método para obtener un producto por su ID.
    getProductsById = async (id) => {
        let thirdAnswer = await this.readProducts();
        const foundProduct = thirdAnswer.find(productos => productos.id === id);

        if (!foundProduct) {
            console.log("No se logró encontrar ningún producto");
        } else {
            console.log(foundProduct);
        }
    };

    // Método para eliminar un producto por su ID.
    deleteProductsById = async (id) => {
        let thirdAnswer = await this.readProducts();
        const foundProduct = thirdAnswer.find(productos => productos.id === id);

        if (!foundProduct) {
            console.log("No se logró encontrar el producto para eliminar");
            return;
        }else{
            const filter = thirdAnswer.filter(productos => productos.id !== id);

            // Escribe la lista filtrada en el archivo.
            await fs.writeFile(this.patch, JSON.stringify(filter));
            console.log("Producto eliminado");
        }
    };


    // Método para actualizar un producto por su ID.
    updateProducts = async (updatedFiles) => {
        if (!updatedFiles.id) {
            console.log("Se debe proporcionar el ID del producto a actualizar");
            return;
        }

        let thirdAnswer = await this.readProducts();
        const index = thirdAnswer.findIndex(productos => productos.id === updatedFiles.id);

        if (index === -1) {
            console.log("No se logró encontrar el producto para actualizar");
            return;
        }

        // Actualiza los campos del producto encontrado.
        thirdAnswer[index] = { ...thirdAnswer[index], ...updatedFiles };

        // Escribe la lista actualizada en el archivo.
        await fs.writeFile(this.patch, JSON.stringify(thirdAnswer));
        console.log("Producto actualizado");
    };
}

// Crear una instancia de la clase ProductManager.
const productos = new ProductManager();

// testing:

// Prueba 1: Obtener la lista de productos (inicialmente vacía).
productos.getProducts().then((result) => {
    console.log("Prueba getProducts:", result);
});

// Prueba 2: Agregar un nuevo producto.
productos.addProduct("producto prueba", "Este es un producto prueba", 200, 25, "abc123", "Sin imagen");

// Prueba 3: Obtener la lista de productos después de agregar un producto.
productos.getProducts().then((result) => {
    console.log("Prueba getProducts después de agregar producto:", result);
});

// Prueba 4: Obtener un producto por su ID (en este caso, el ID es 1).
productos.getProductsById(1);

// Prueba 5: Actualizar un producto (en este caso, cambiar el precio del producto con ID 1 a 250).
productos.updateProducts({ id: 1, price: 250 });

// Prueba 6: Eliminar un producto por su ID (en este caso, eliminar el producto con ID 1).
productos.deleteProductsById(1);