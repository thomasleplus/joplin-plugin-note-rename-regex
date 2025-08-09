import Plugin from "../Plugin";
import Joplin from "./Joplin";
/**
 * @ignore
 */
export default class Global {
  private joplin_;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(implementation: any, plugin: Plugin, store: any);
  get joplin(): Joplin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get process(): any;
}
