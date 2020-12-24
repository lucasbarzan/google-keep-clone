import { COLORS_ARRAY } from './ColorEnums';

export default (currentColor: number): number => {
  const lastIndex = COLORS_ARRAY.findIndex(elem => elem === currentColor);
  const newIndex = (lastIndex + 1) % COLORS_ARRAY.length;
  return COLORS_ARRAY[newIndex];
};
