import { json } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CatalogMirrorsPage } from "~/pages/catalog/CatalogMirrorsPage";

export const meta: MetaFunction = ({ data }) => {
    return { title: data?.title || "Зеркала" };
};

export const loader = async (args: LoaderArgs) => {
    const data = [{title: "Венецианское зеркало"}]
    return json({ catalogMirrors: data, title: "Зеркала" });
}

export default function CatalogMirrorsIndexRoute() {
    const { catalogMirrors } = useLoaderData<typeof loader>();

    return <CatalogMirrorsPage catalogMirrors={catalogMirrors} />;
}