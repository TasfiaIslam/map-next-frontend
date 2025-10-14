import { client } from "./sanity.client";

export async function getPosts() {
  return await client.fetch(`*[_type == "post"]{title, slug, mainImage}`);
}
