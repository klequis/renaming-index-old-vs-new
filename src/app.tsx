import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";


function splitFilePath(path: string) {
  const parts = path.split("/");
  const index = parts.indexOf("routes");
  return parts.slice(index + 1).join("/");
}

function routeToObj(route) {
  const x = route.children ? [...route.children, route] : [route];

  const y = x.map((r) => ({
    path: r.path,
    filePath: splitFilePath(r.filePath),
  }));
  return y;
}

function routesToObjs(routes) {
  const rto = routes.map(routeToObj);
  return rto;
}

function isOdd(num) { return num % 2;}

const MakeRowGroup = (routes,idx) => {
  
  const tableClass = isOdd(idx) ? "background-red" : "background-blue";
  return (
    <tbody class={tableClass}>
      {routes.map((r) => (
        <tr>
          <td>{r.filePath}</td>
          <td>{r.path}</td>
        </tr>
      ))}
    </tbody>
  );
};

function PrintRoutes() {
  const routes = FileRoutes();
  const routeObjs = routesToObjs(routes);
  console.log('routes', routes)

  return (
    <table>
      <thead>
        <tr>
          <th>File</th>
          <th>path/URL</th>
        </tr>
      </thead>
      {routeObjs.map((x, idx) => MakeRowGroup(x,idx))}
    </table>
  );
}

export default function App() {
  return (
    <Router
      root={(props) => (
        <div class="component background-red">
          <p class="file-name">app.tsx</p>
          <a class="button-1" href="/">
            (0) /
          </a>
          <a class="button-1" href="/olddocsway">
            (1) /olddocsway
          </a>
          <a class="button-1" href="/newdocsway">
            (2) /newdocsway
          </a>
          <a class="button-1" href="/newdocsway/newdocsway">
            (3) /newdocsway/newdocsway
          </a>
          <Suspense>{props.children}</Suspense>
          <PrintRoutes />
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
