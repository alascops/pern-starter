declare global {
   type Transpose<T> = {
      [key: string]: T
   }

   type Nullable<T> = T | null | undefined
}

export {}