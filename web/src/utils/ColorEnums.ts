/* eslint-disable no-shadow */
export enum COLORS {
  NO_COLOR = 0,
  RED = 1,
  ORANGE = 2,
  YELLOW = 3,
  GREEN = 4,
  CYAN = 5,
  LIGHT_BLUE = 6,
  DARK_BLUE = 7,
  PURPLE = 8,
  PINK = 9,
  BROWN = 10,
  GRAY = 11,
}

export const COLOR_TO_HEX: { [key: number]: string } = {
  [COLORS.NO_COLOR]: '',
  [COLORS.RED]: '#f28b82',
  [COLORS.ORANGE]: '#fbbc04',
  [COLORS.YELLOW]: '#fff475',
  [COLORS.GREEN]: '#ccff90',
  [COLORS.CYAN]: '#a7ffeb',
  [COLORS.LIGHT_BLUE]: '#cbf0f8',
  [COLORS.DARK_BLUE]: '#aecbfa',
  [COLORS.PURPLE]: '#d7aefb',
  [COLORS.PINK]: '#fdcfe8',
  [COLORS.BROWN]: '#e6c9a8',
  [COLORS.GRAY]: '#e8eaed',
};

export const COLORS_ARRAY: number[] = [
  COLORS.NO_COLOR,
  COLORS.RED,
  COLORS.ORANGE,
  COLORS.YELLOW,
  COLORS.GREEN,
  COLORS.CYAN,
  COLORS.LIGHT_BLUE,
  COLORS.DARK_BLUE,
  COLORS.PURPLE,
  COLORS.PINK,
  COLORS.BROWN,
  COLORS.GRAY,
];
