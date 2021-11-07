import { RealElement, VElement } from "../elements/createElement";

type Render = (element: VElement | string) => RealElement;

const render: Render = (vElement) => {
  if (typeof vElement === "string") {
    return document.createTextNode(vElement);
  }
  const $el = document.createElement(vElement.tagName);

  for (const [k, v] of Object.entries(vElement.attrs)) {
    $el.setAttribute(k, v);
  }

  for (const child of vElement.children) {
    $el.appendChild(render(child));
  }

  return $el;
};

export default render;
