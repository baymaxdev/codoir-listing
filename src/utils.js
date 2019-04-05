export const selectedTextLimit = count => selected =>
  count >= selected.length
    ? selected.join(',')
    : `${[...selected.slice(0, count)].join(',')}, +${selected.length - count}`;
