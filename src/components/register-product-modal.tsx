import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from './ui/button'
import { DialogHeader, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import type { Product } from './main'
import { currencyToFloat, maskCurrency } from '@/utils/masks'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const newProductSchema = z.object({
  id: z.number(),
  category: z.enum(['Computadores', 'Acessórios', 'Impressoras', 'Games', 'Gadgets']),
  brand: z.enum(['Dell', 'Positivo', 'HP', 'Asus', 'Xing Ling']),
  name: z.string().min(1),
  price: z.string().refine((value) => currencyToFloat(value) >= 0.01, "Price should be greater than 0."),
  condition: z.enum(['new', 'used']),
});

interface RegisterProductModalProps {
  products: Product[];
  category: 'Computadores' | 'Acessórios' | 'Impressoras' | 'Games' | 'Gadgets';
  addProduct: (newProduct: Product) => void;
}

type NewProduct = z.infer<typeof newProductSchema>;

export function RegisterProductModal({ products, category, addProduct }: RegisterProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, control, reset } = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      id: products.length + 1,
      category,
      brand: 'Dell',
      name: '',
      price: 'R$ 0,00',
      condition: 'new',
    }
  });

  function onSubmit(data: NewProduct) {
    addProduct({
      ...data,
      price: currencyToFloat(data.price)
    })

    setIsOpen(false)
    toast.success('Produto cadastrado com sucesso!')
    reset()
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const maskedValue = maskCurrency(inputValue);
    setValue('price', maskedValue);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{category} - Novo Produto</DialogTitle>
            <DialogDescription>
              Cadastre um novo produto aqui. Clique em salvar quando estiver pronto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className={twMerge("text-right", errors.name && "text-red-500")}>
                Nome
              </Label>
              <Input id="productName" className={twMerge("col-span-3", errors.name && "border-red-500 text-red-500 focus-visible:ring-transparent")} {...register("name")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Marca
              </Label>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dell">Dell</SelectItem>
                      <SelectItem value="Positivo">Positivo</SelectItem>
                      <SelectItem value="HP">HP</SelectItem>
                      <SelectItem value="Asus">Asus</SelectItem>
                      <SelectItem value="Xing Ling">Xing Ling</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Seção
              </Label>
              <Input id="section" className="col-span-3" disabled {...register("category")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className={twMerge("text-right", errors.price && "text-red-500")}>
                Preço
              </Label>
              <Input
                id="price"
                className={twMerge("col-span-3", errors.price && "border-red-500 text-red-500 focus-visible:ring-transparent")}
                {...register("price", { onChange: handlePriceChange })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Condição</Label>
              <div className="col-span-3">
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">Novo</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="used" id="used" />
                        <Label htmlFor="used">Usado</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  )
}