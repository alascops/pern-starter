import { Fragment } from "react"
import { Helmet } from "react-helmet-async"
import { useFieldArray, useForm, type SubmitErrorHandler, type SubmitHandler } from "react-hook-form"
import { z, type TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { faCaretDown, faCaretUp, faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const validation = z.object({
   username: z.string({ invalid_type_error: "Username can only be a string." })
      .max(15, "Username must be at most 15 characters."),
   favorites: z.object({
      name: z.string({ invalid_type_error: "Favorite Name can only be a string." })
         .min(1, "Favorite Name is required.")
         .max(15, "Favorite Name must be at most 50 characters.")
   }).array()
})

type Fields = TypeOf<typeof validation>

const Home = () => {
   const { control, formState: { errors }, handleSubmit, register } = useForm<Fields>({
      mode: "onSubmit",
      resolver: zodResolver(validation),
      defaultValues: {
         favorites: [
            { name: "" }
         ]
      }
   })

   const { append, fields, remove, swap } = useFieldArray<Fields>({
      control,
      name: "favorites"
   })

   const appendFavorites = () => append({
      name: ""
   })

   const removeFavorite = (index: number) => remove(index)

   const pushFavorite = (index: number, direction: "up" | "down") => {
      if (direction === "up") {
         swap(index, index ===  0 ? fields.length - 1 : index - 1)
      } else {
         swap(index, index === fields.length - 1 ? 0 : index + 1)
      }
   }

   const handleSubmitForm: SubmitHandler<Fields> = (values) => {
      console.log(values)
   }

   const handleErrorForm: SubmitErrorHandler<Fields> = (errors) => {
      console.log(errors)
   }
   
   return (
      <Fragment>
         <Helmet title="PERN Starter | Home" />

         <main className="grid grid-cols-2 antialiased bg-gray-800 overflow-x-hidden overflow-y-auto w-full min-h-screen">
            <form className="flex flex-col gap-y-5 p-5" autoComplete="off" onSubmit={ handleSubmit(handleSubmitForm, handleErrorForm) }>
               <div className="flex flex-col gap-y-2.5">
                  <label className="text-white font-semibold" htmlFor="username">Preferred Name <span className="text-yellow-500">(Defaults to username if not provided)</span></label>
                  <input { ...register("username") } id="username" className="text-white caret-white placeholder:text-white bg-transparent rounded-sm border border-solid border-white focus:outline-none focus:border-blue-500 px-2.5 py-1" type="text" maxLength={ 15 } placeholder="Enter Preferred Username" autoFocus />
                  { errors?.username && <small className="text-red-500">{ errors.username.message }</small> }
               </div>

               <div className="flex flex-col gap-y-2.5">
                  <label className="text-white font-semibold" htmlFor="favorites.0.name">Favorites <span className="text-yellow-500">(From most to least favorite)</span></label>
                  {
                     fields?.length && fields.map((field, index) => (
                        <Fragment key={ field.id }>
                           <div className="flex items-center gap-x-3">
                              <input { ...register(`favorites.${ index }.name`) } id={ `favorites.${ index }.name` } className="grow text-white caret-white placeholder:text-white bg-transparent rounded-sm border border-solid border-white focus:outline-none focus:border-blue-500 px-2.5 py-1" type="text" maxLength={ 50 } placeholder={ `Enter Favorite #${ index + 1 } Name` } />
                              {
                                 fields.length > 1 && (
                                    <div className="flex items-center gap-x-1.5">
                                       <button className="text-white bg-red-500" type="button" onClick={ () => removeFavorite(index) }>
                                          <FontAwesomeIcon icon={ faXmark } color="#FFFFFF" fixedWidth />
                                       </button>

                                       <button className="text-black bg-yellow-500" type="button" onClick={ () => pushFavorite(index, "up") }>
                                          <FontAwesomeIcon icon={ faCaretUp } color="#000000" fixedWidth />
                                       </button>

                                       <button className="text-black bg-yellow-500" type="button" onClick={ () => pushFavorite(index, "down") }>
                                          <FontAwesomeIcon icon={ faCaretDown } color="#000000" fixedWidth />
                                       </button>
                                    </div>
                                 )
                              }
                           </div>
                           { errors?.favorites?.[index]?.name && <small className="text-red-500">{ errors.favorites[index]!.name!.message }</small> }
                        </Fragment>
                     ))
                  }
               </div>

               <div className="flex items-center gap-x-5">
                  <button className="flex items-center gap-x-2.5 text-white font-semibold transition-all duration-300 ease-in-out rounded-sm bg-blue-500 hover:brightness-90 hover:scale-105 px-2.5 py-1" type="button" onClick={ appendFavorites }>
                     <FontAwesomeIcon icon={ faPlus } color="#FFFFFF" fixedWidth />
                     Add New Favorite
                  </button>
                  
                  <button className="flex items-center gap-x-2.5 text-white font-semibold transition-all duration-300 ease-in-out rounded-sm bg-green-500 hover:brightness-90 hover:scale-105 px-2.5 py-1" type="submit">
                     <FontAwesomeIcon icon={ faCheck } color="#FFFFFF" fixedWidth />
                     Submit
                  </button>
               </div>
            </form>

            <div className="flex flex-col p-5">
               <table className="table table-fixed border-collapse border border-solid border-white w-full">
                  <thead>
                     <tr>
                        <td className="table-cell text-white font-bold text-center text-ellipsis whitespace-nowrap overflow-x-hidden border border-solid border-white px-2.5">User</td>
                        <td className="table-cell text-white font-bold text-center text-ellipsis whitespace-nowrap overflow-x-hidden border border-solid border-white px-2.5">Date</td>
                        <td className="table-cell text-white font-bold text-center text-ellipsis whitespace-nowrap overflow-x-hidden border border-solid border-white px-2.5">Favorite(s)</td>
                     </tr>
                  </thead>

                  <tbody>
                  
                  </tbody>
               </table>
            </div>
         </main>
      </Fragment>
   )
}

export default Home