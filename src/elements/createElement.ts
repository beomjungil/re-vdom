export interface VElement {
  tagName: keyof HTMLElementTagNameMap;
  attrs: { [key: string]: string };
  children: Array<VElement | string>;
}

export type VElementOption = Omit<VElement, "tagName">;

export type RealElement = HTMLElement | Text;

type CreateElement = (
  tagName: VElement["tagName"],
  options?: VElementOption
) => VElement;

const createElement: CreateElement = (
  tagName,
  { attrs = {}, children = [] } = { attrs: {}, children: [] }
) => {
  const element = Object.create(null);

  Object.assign(element, {
    tagName,
    attrs,
    children,
  });

  return element;
};

export default createElement;
