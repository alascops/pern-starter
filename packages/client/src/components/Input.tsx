import { useController, useFieldArray, useFormContext, type Control } from "react-hook-form"
import { z, type TypeOf } from "zod";

const resolver = z.object({
   username: z.string().min(1).max(15),
   password: z.string().min(1).max(15),
   favorites: z.object({
      name: z.string().min(1).max(50),
      others: z.object({
         name2: z.string()
      }).array()
   }).array()
});

type Props = {
   index: number
}

const Input = ({ index }: Props) => {
   const { control, register } = useFormContext<TypeOf<typeof resolver>>()

   const { fields, append } = useFieldArray<TypeOf<typeof resolver>>({
      name: `favorites.${ index }.others`,
      control
   });

  return (
      <div className="flex flex-col gap-y-2">
         {
            fields.map((field, i) => (
               <input key={ field.id } { ...register(`favorites.${ index }.others.${ i }.name2`) } className="rounded-sm focus:outline-none w-full px-2.5 py-1.5" type="text" placeholder={ `Enter Favorite SubName ${ i + 1 }` } />
            ))
         }

         <button className="text-white bg-red-500" type="button" onClick={ () => append({ name2: "" }) }>Append Sub</button>
      </div>
  )
}

export default Input