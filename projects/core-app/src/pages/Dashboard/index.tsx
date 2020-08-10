import React, { useEffect, useState } from "react";

/**
 *
 * implementation of workers
 *
 * NOTE: worker must contain the extention ts|tsx
 */

//@ts-ignore
import DashboardWorker from "../../workers/dashboard.worker.ts";
const worker = new DashboardWorker();

export default () => {
  const [message, setmessage] = useState("");
  useEffect(() => {
    /**
     * post data to webworker to work on
     */
    worker.postMessage("hello");

    /**
     *
     * receive computated data from web worker
     * @param e
     */
    worker.onmessage = (e: any) => {
      const workerData = e.data;

      setmessage(workerData);
    };
  }, []);
  return (
    <div>
      Dashboard
      <p color="#fddd">Worker: {message}</p>
    </div>
  );
};
