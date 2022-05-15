import { RouteObject } from "react-router";

interface RouteItem extends RouteObject {
  name?: string;
  icon?: string;
  children?: RouteItem[];
}

export default RouteItem;
