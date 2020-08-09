export const random = <T>(coll: T[]) => {
  const length = coll.length;
  const idx = Math.floor(Math.random() * length);
  return coll[idx];
};
