const aspectRatio = require("@tailwindcss/aspect-ratio")
const lineClamp = require("@tailwindcss/line-clamp")
const plugin = require("tailwindcss/plugin")

module.exports = {
   mode: "jit",
   darkMode: "class",
   content: [
      "./src/**/*.{ts,tsx}"
   ],
   theme: {
      extend: {
         gridTemplateColumns: Object.assign({}, ...[...Array(13).keys()].map((val) => ({
            [val + 13]: `repeat(${ val + 13 }, minmax(0, 1fr))`
         }))),
         brightness: Object.assign({}, ...[...Array(5).keys()].map((each) => ({
            [(each + 1) * 20]: ((each + 1) * 20) / 100
         })))
      }
   },
   plugins: [
      aspectRatio,
      lineClamp,
      plugin(({ addComponents, addUtilities }) => {
         addComponents([{
            ".container-base": {
               marginInline: "auto",
               paddingInline: "1.5rem",
               width: "100%"
            }
         }, {
            "@media screen and (min-width: 992px)": {
               ".container-base": {
                  paddingInline: "4.5rem"
               }
            }
         }])

         // addUtilities([...Array(5).keys()].map((each) => ({
         //    [`.brightness-${ (each + 1) * 20 }`]: {
         //       filter: `brightness(${ (each + 1) * 20 }%)`
         //    }
         // })))

         addUtilities({
            ".flex-center": {
               display: "flex",
               alignItems: "center",
               justifyContent: "center"
            }
         })

         addUtilities({
            ".transition-base": {
               transitionProperty: "all",
               transitionDuration: "300ms",
               transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
            }
         })
      })
   ]
}
