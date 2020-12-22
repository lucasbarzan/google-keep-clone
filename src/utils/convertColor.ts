import { COLOR_TO_HEX } from './ColorEnums';

export default (color: number): string => {
  return COLOR_TO_HEX[color];
};
