import { RealElement, VElement } from "../elements/createElement";
import zip from "../utils/zip";
import render from "./render";

type PatchFunc = ($el: RealElement) => RealElement;
type Diff<T> = (previous: T, next: T) => PatchFunc;

const replace: Diff<VElement | string> = (_, newTree) => {
  return ($node) => {
    const $newNode = render(newTree);
    $node.replaceWith($newNode);
    return $newNode;
  };
};

const diffAttrs: Diff<VElement["attrs"]> = (oldAttrs, newAttrs) => {
  const patches: PatchFunc[] = [];

  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node) => {
      if ($node instanceof Text) {
        return $node;
      }

      $node.setAttribute(k, v);
      return $node;
    });
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node) => {
        if ($node instanceof Text) {
          return $node;
        }

        $node.removeAttribute(k);
        return $node;
      });
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  };
};

const diffChildren: Diff<VElement["children"]> = (oldChildren, newChildren) => {
  const childPatches: PatchFunc[] = oldChildren.map((oldChild, i) =>
    diff(oldChild, newChildren[i])
  );

  const additionalPatches: PatchFunc[] = [];

  for (const additionalVChild of newChildren.slice(oldChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }

    return ($parent) => {
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child as HTMLElement);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  };
};

const diff: Diff<VElement | string> = (oldTree, newTree) => {
  if (newTree === undefined) {
    return ($node) => {
      $node.remove();
      return $node;
    };
  }

  if (typeof oldTree === "string" || typeof newTree === "string") {
    if (oldTree !== newTree) {
      return replace(oldTree, newTree);
    } else {
      return ($node) => $node;
    }
  }

  if (oldTree.tagName !== newTree.tagName) {
    return replace(oldTree, newTree);
  }

  const patchAttrs = diffAttrs(oldTree.attrs, newTree.attrs);
  const patchChildren = diffChildren(oldTree.children, newTree.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

export default diff;
