import * as collection from "./collection";
import {
  red,
  blue,
  green,
  purple,
  cyan,
  orange,
  
} from "@material-ui/core/colors";

const colorPalletes = [
  red,
  blue,
  green,
  purple,
  cyan,
  orange,
];

const colorProperties = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
];

export const random = () => {
  const palette = collection.random<any>(colorPalletes);
  const property = collection.random<number>(colorProperties);
  return palette[property] as string;
};
