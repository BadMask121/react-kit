### Worker Implementation

Workers are abit tricky with CRA so we had to hack our way around to make it work

## To import a worker

`import DashboardWorker from "../../workers/dashboard.worker.ts"`
`` Remember to comment //ts-ignore at the top of the import

## Then instanciate or declare the worker

`const worker = new DashboardWorker();`
