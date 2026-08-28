import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";

import styles from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: styles,
      },
    ],
    script: [
      {
        children: `
          (() => {
            const savedTheme = localStorage.getItem("theme");
            const theme =
              savedTheme ||
              (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");

            document.documentElement.setAttribute("data-theme", theme);
          })();
        `,
      },
    ],
  }),

  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}