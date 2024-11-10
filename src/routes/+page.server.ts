// import { redirect } from '@sveltejs/kit';

// import config from '$src/helpers/config';
// import * as publicEnvs from '$env/static/public';

// // If the app is configured to use the /index route instead of home, then redirect
// export function load() {
//   const shouldLoadIndex = publicEnvs?.PUBLIC_LOAD_INDEX || config?.loadIndex;
//   if (shouldLoadIndex) {
//     throw redirect(302, '/index');
//   }
// };

import { load as loadPosts } from '$src/routes/blog/+page.server';
import { load as loadProjects } from '$src/routes/projects/+page.server';
import { load as loadSocials } from '$src/routes/contact/+page.server';
import config from '$src/helpers/config';
import type { PageServerLoad } from './$types';
import type { Verse } from '$src/types/Project';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
const loadVerse = async ({ fetch }): Promise<Verse> => {
  let searchVerse = true;
  let lastVerseObject = {reference: "Philippians 4:13", text: "I can do all things through him who strengthens me."};
    /*const verse = await fetch("https://bible-api.com?random=verse")
      .then((res: any) => res.json())
      .then((data: any) => {
        return {
          reference: data.reference,
          text: data.text
        }
      });
    return verse;*/
  return lastVerseObject;
}

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }: PageServerLoad) => {
  return {
    posts: (await loadPosts({ fetch }, config.initialFeeds)).posts,
    repos: (await loadProjects({ fetch })).repos,
    socials: (await loadSocials({ fetch })).props,
    verse: (await loadVerse({ fetch })),
  }
};
