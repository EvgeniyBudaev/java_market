import { FC } from 'react'
import { useTranslation } from 'react-i18next';

export const CatalogMirrorsPage: FC<{catalogMirrors: any}> = ({ catalogMirrors }) => {
    const { t } = useTranslation();
    console.log("catalogMirrors: ", catalogMirrors);

    return (
        <>
            <h1>{t('catalog.catalogMirrors.title')}</h1>
        </>
    )
}