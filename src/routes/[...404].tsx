import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <main class="component">
      <HttpStatusCode code={404} />
      <p class="file-name">routes/[...404].tsx</p>
      <h1>Page Not Found</h1>
    </main>
  );
}
