import { ZodType } from "zod";

export async function fetchData<T>(url: string, schema: ZodType<T>) {
    return fetch(url)
        .then((res) => {
            if (!res.ok)
                throw new Error(`Request failed with status ${res.status}`);

            return res.json() as unknown;
        })
        .then(data => schema.parse(data))
}