import { getInitialNamespaces } from 'remix-i18next';
import { RemixBrowser } from "@remix-run/react";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
import Backend from "i18next-http-backend";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as Sentry from "@sentry/browser";
import {IWindowGlobals} from "~/types/globals";
import i18nextOptions from '../i18next-options';

declare global {
    interface Window {
        GLOBALS?: IWindowGlobals;
    }
}

Sentry.init({
    dsn: window.GLOBALS?.sentryDsn,
    tracesSampleRate: 1.0,
});

if (!i18next.isInitialized) {
    i18next
        .use(ICU)
        .use(initReactI18next)
        .use(LanguageDetector)
        .use(Backend)
        .init({
            ...i18nextOptions,
            ns: getInitialNamespaces(),
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json',
                requestOptions: {
                    cache: 'no-store',
                },
            },
            detection: {
                order: ['htmlTag'],
                caches: [],
            },
        })
        .then(() =>
            hydrateRoot(
                document,
                <I18nextProvider i18n={i18next}>
                    <RemixBrowser />
                </I18nextProvider>
            ),
        );
}
