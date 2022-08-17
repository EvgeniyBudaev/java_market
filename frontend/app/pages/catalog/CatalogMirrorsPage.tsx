import type { FC } from 'react'
import { useTranslation } from 'react-i18next';

export const CatalogMirrorsPage: FC<{catalogMirrors: any}> = ({ catalogMirrors }) => {
    const { t } = useTranslation();
    console.log("catalogMirrors: ", catalogMirrors);

    return (
        <>
            <h1 className="text-3xl font-bold underline text-red-600">{t('catalog.catalogMirrors.title')}</h1>
            <p className="text-3xl font-bold underline text-primary">Hello World!</p>
        </>
    )
}