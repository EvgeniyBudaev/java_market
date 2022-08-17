import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {FC, ReactNode} from 'react'
import { useTranslation } from 'react-i18next';
import {useInitLanguage} from "~/hooks";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Java market",
  viewport: "width=device-width,initial-scale=1",
});

const Document: FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  useInitLanguage();

  return (
      <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=yes"
        />
        <Meta />
        <Links />
      </head>
      <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
      </html>
  );
};

export default function App() {
  return (
    <>
      <Document>
        <Outlet />
      </Document>
    </>
  );
}
