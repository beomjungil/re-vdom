import { RealElement } from "../elements/createElement";

type Mount = (target: RealElement, element: HTMLElement | null) => RealElement;

const mount: Mount = (target, element) => {
    if (element === null) {
        throw new Error("element is null");
    }
    element.replaceWith(target);
    return target;
}

export default mount;
