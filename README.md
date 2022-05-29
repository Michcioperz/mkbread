# mkbread

a Misskey alternative read-only web client for people who don't have time to load the actual one

powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte) et al

## Config (very important!)

In the `src/lib/os.ts` file you need to supply your instance URL and your user token. DO NOT COMMIT YOUR USER TOKEN TO A PUBLIC REPOSITORY LMAO

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
