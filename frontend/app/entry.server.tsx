import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import type { EntryContext } from '@remix-run/server-runtime';
import { resolve } from 'node:path';
import { remixI18next } from '~/services';
import i18nextOptions from '../i18next-options';
import ICU from 'i18next-icu';

export default async function handleRequest(
    request: Request,
    statusCode: number,
    headers: Headers,
    context: EntryContext,
) {
    const instance = createInstance();

    const lng = 'ru';
    const ns = remixI18next.getRouteNamespaces(context);

    await instance
        .use(ICU)
        .use(initReactI18next)
        .use(Backend)
        .init({
            ...i18nextOptions,
            lng,
            ns,
            backend: {
                loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
            },
        });

    const markup = renderToString(
        <I18nextProvider i18n={instance}>
            <RemixServer context={context} url={request.url} />
        </I18nextProvider>,
    );

    headers.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        status: statusCode,
        headers: headers,
    });
}
