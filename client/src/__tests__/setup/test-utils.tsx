import { ReactElement } from "react";

import { render } from "@testing-library/react";

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
