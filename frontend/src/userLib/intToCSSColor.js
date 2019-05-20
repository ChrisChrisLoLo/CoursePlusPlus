//Hashes an integer into a semi-random color (All values generated should have high values and be bright)
//Returns a string that can be interpreted as color in CSS
export default (input) => {
  const MAX_COLOR_VALUE = 255;
  const MIN_COLOR_VALUE = 107;
  const SCENARIO_COUNT = 6;

  const scenario = input % (SCENARIO_COUNT - 1);

  //hash a color value between the max and min color value
  const randColorValue = (input % (MAX_COLOR_VALUE - MIN_COLOR_VALUE)) + MIN_COLOR_VALUE;

  const color = {red: 0, green: 0, blue: 0};
  switch (scenario) {
    case 0:
      color.red = MAX_COLOR_VALUE;
      color.green = MIN_COLOR_VALUE;
      color.blue = randColorValue;
      break;
    case 1:
      color.red = MAX_COLOR_VALUE;
      color.green = randColorValue;
      color.blue = MIN_COLOR_VALUE;
      break;
    case 2:
      color.red = MIN_COLOR_VALUE;
      color.green = MAX_COLOR_VALUE;
      color.blue = randColorValue;
      break;
    case 3:
      color.red = MIN_COLOR_VALUE;
      color.green = randColorValue;
      color.blue = MAX_COLOR_VALUE;
      break;
    case 4:
      color.red = randColorValue;
      color.green = MAX_COLOR_VALUE;
      color.blue = MIN_COLOR_VALUE;
      break;
    case 5:
      color.red = randColorValue;
      color.green = MIN_COLOR_VALUE;
      color.blue = MAX_COLOR_VALUE;
  }

  return `rgb(${color.red},${color.green},${color.blue})`
}