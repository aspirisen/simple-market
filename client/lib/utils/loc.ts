export type Locators = typeof loc;

export const loc = fillPaths({
  auth: {
    name: "",
    email: "",
    pass: "",
    submit: "",
  },
  components: {
    page: {
      totalPrice: "",
    },
    product: {
      container: "",
      price: "",
      kind: "",
      addToCart: "",
    },
    incremental: {
      minus: "",
      value: "",
      plus: "",
    },
  },
});

function fillPaths<T>(ids: T, parentPath = "loc_") {
  const obj = ids as any;

  Object.keys(obj).forEach((key) => {
    if (obj[key] === "") {
      obj[key] =
        typeof cy === "undefined"
          ? `${parentPath}_${key}`
          : `[data-testid=${parentPath}_${key}]`;
    } else if (typeof obj[key] === "object") {
      fillPaths(obj[key], `${parentPath}_${key}`);
    }
  });

  return obj as T;
}
