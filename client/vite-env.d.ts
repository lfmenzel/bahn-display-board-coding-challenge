interface ImportMetaEnv {
  readonly VITE_BAHN_SIMPLE_SERVER_HOST: string;
  readonly VITE_BAHN_SIMPLE_SERVER_PORT: string;

  readonly VITE_BAHN_CLIENT_HOST: string;
  readonly VITE_BAHN_CLIENT_PORT: string;

  readonly VITE_IS_LOCAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

// CSS module type declarations
declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.styl" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
