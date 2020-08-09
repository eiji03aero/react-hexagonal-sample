export const random = <T>(coll: T[]) => {
  const length = coll.length;
  const idx = Math.floor(Math.random() * length);
  return coll[idx];
};

export const updateById = <T extends { id: string }>(coll: T[], el: T) => {
  return coll.map((c: T) => {
    return el.id === c.id
      ? el
      : c;
  });
};
