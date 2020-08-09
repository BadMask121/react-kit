/// <reference types="react-scripts" />
export { default } from ".";
export * from "./index";

declare module "*.worker.ts" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
