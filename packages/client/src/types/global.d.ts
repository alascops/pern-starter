declare global {
   type RequestError = {
      error?: {
         message: string,
         stack: string
      }
   }
   
   type Transpose<T> = {
      [key: string]: T
   }

   type Nullable<T> = T | null | undefined
}

export {}