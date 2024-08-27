import type { Product } from './main'
import ProductCard from "./product-card";
import { RegisterProductModal } from './register-product-modal'

interface ProductListProps {
  products: Product[];
  category: 'Computadores' | 'Acessórios' | 'Impressoras' | 'Games' | 'Gadgets';
  addProduct: (newProduct: Product) => void;
}

export default function ProductList({ products, category, addProduct }: ProductListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      {products
        .filter((p) => p.category === category)
        .map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}

      <RegisterProductModal products={products} category={category} addProduct={addProduct} />
    </div>
  );
}