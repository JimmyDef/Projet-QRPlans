// /src/types/ldrs.d.ts

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'l-tailspin': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: string | number
        stroke?: string | number
        speed?: string | number
        color?: string
      }
      // ... Ajouter d'autres custom elements si besoin
    }
  }
}

// Petit export vide pour que le fichier soit traité comme un module
export {}
