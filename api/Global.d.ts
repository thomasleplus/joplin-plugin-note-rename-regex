// eslint-disable n/no-missing-import
import Plugin from "../Plugin";
import Joplin from "./Joplin";
// eslint-enable n/no-missing-import
/**
 * @ignore
 */
export default class Global {
  private joplin_;
  constructor(implementation: any, plugin: Plugin, store: any);
  get joplin(): Joplin;
  get process(): any;
}
