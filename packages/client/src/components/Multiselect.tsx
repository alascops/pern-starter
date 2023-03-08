import { useEffect, useRef, useState } from "react"

const Multiselect = () => {
   const list = useRef<HTMLUListElement>(null)

   const [values, setValues] = useState<any[]>([])

   const [isToggled, setToggled] = useState<boolean>(false)

   const select = (value: any) => {
      setValues((values) => [...values, value])
      setToggled(false)
   }

   const toggle = () => {
      setToggled((isToggled) => !isToggled)
   }

   useEffect(() => {
      console.log(values)
   }, [values])

   return (
      <div className="relative w-[300px]">
         <button className="flex items-center gap-x-1 rounded-sm bg-white border border-gray-800 w-full h-[40px] p-2" onClick={ toggle } type="button">
            {
               values.length ? values.map((value) => (
                  <div className="rounded-sm border border-gray-300 px-1">
                     <span className="text-sm" key={ value }>{ value }</span>

                     
                  </div>
                  
               )) : <span className="text-sm">Select Value</span>
            }
         </button>

         <ul className={ `absolute top-full inset-x-0 transition-all ease-in-out duration-300 ${ isToggled ? 'opacity-1 visible' : 'opacity-0 invisible' } flex flex-col gap-y-1 list-none rounded-sm bg-white border border-gray-800 w-full` } ref={ list }>
            <li className="cursor-pointer hover:bg-gray-300 px-2 py-1" onClick={ () => select(1) }>Test 1</li>
            <li className="cursor-pointer hover:bg-gray-300 px-2 py-1" onClick={ () => select(2) }>Test 2</li>
            <li className="cursor-pointer hover:bg-gray-300 px-2 py-1" onClick={ () => select(3) }>Test 3</li>
         </ul>
      </div>
      
   )
}

export default Multiselect