const isArrayNull = (arr: any[]): boolean => {
  return arr.every((obj) =>
    Object.values(obj).every((value) => value === null || value === undefined),
  );
};

export default isArrayNull;
