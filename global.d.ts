declare module "*./public/ssr" {
  export * from "ssr";
}

declare module "*./public/index.html" {
  export default "" as string;
}

interface Window {
  APOLLO_STATE: import("apollo-boost").NormalizedCacheObject;
}

declare namespace Express {
  export type User = import("server/models/User").User;
}
