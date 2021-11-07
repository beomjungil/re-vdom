const zip = <L, R extends Node>(left: L[], right: NodeListOf<R>): Array<[L, R]> => {
  const zipped: Array<[L, R]> = [];
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    zipped.push([left[i], right[i]]);
  }
  return zipped;
};

export default zip;
