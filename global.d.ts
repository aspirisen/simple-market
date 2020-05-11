declare module "*./public/ssr" {
  export * from "ssr";
}

declare module "*./public/index.html" {
  export default "" as string;
}

interface Window {
  APOLLO_STATE: import("apollo-boost").NormalizedCacheObject;
}
