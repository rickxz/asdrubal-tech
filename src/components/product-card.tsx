import dellImage from "/dell.png";
import hpImage from "/hp.png";
import asusImage from "/asus.png";
import xingLingImage from "/xing-ling.png";
import positivoImage from "/positivo.png";
import type { Product } from './main'

const brandMap = {
  Dell: dellImage,
  Positivo: positivoImage,
  HP: hpImage,
  Asus: asusImage,
  'Xing Ling': xingLingImage,
}

export default function ProductCard({ id, brand, name, price, condition }: Product) {
  return (
    <div key={id} className="flex items-center mb-4">
      <img src={brandMap[brand]} alt={brand} className="w-12 h-12 mr-4 object-contain" />
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-500">
          {condition === "new" ? "Novo" : "Usado"} - R${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}