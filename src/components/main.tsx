import Header from "./header";
import  { useState } from "react";
import ProductList from "./product-list";
import { Toaster } from 'react-hot-toast'

export interface Product {
  id: number;
  category: 'Computadores' | 'Acessórios' | 'Impressoras' | 'Games' | 'Gadgets';
  brand: 'Dell' | 'Positivo' | 'HP' | 'Asus' | 'Xing Ling';
  name: string;
  price: number;
  condition: 'new' | 'used'
}

export default function Main() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      category: "Computadores",
      brand: "Dell",
      name: "Dell Inspiron 15",
      price: 2999.99,
      condition: 'new'
    },
    {
      id: 2,
      category: "Impressoras",
      brand: "HP",
      name: "HP LaserJet Pro M15w",
      price: 1000.99,
      condition: 'new'
    },
    {
      id: 3,
      category: "Acessórios",
      brand: "Xing Ling",
      name: "Controle de PlayStation 5",
      price: 120.99,
      condition: 'used'
    },
    {
      id: 4,
      category: "Games",
      brand: "Xing Ling",
      name: "PlayStation 5",
      price: 3000.99,
      condition: 'new'
    },
    {
      id: 5,
      category: "Gadgets",
      brand: "Positivo",
      name: "Positivo Watch",
      price: 2.99,
      condition: 'new'
    },
  ]);

  function addProduct(newProduct: Product) {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <Toaster />
      </div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductList products={products} category="Computadores" addProduct={addProduct} />
        <ProductList products={products} category="Acessórios" addProduct={addProduct} />
        <ProductList products={products} category="Impressoras" addProduct={addProduct} />
        <ProductList products={products} category="Games" addProduct={addProduct} />
        <ProductList products={products} category="Gadgets" addProduct={addProduct} />
      </div>
    </div>
  );
}