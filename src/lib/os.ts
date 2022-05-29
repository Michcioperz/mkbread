import * as Misskey from 'misskey-js';

export const localUrl = 'https://fedi2.0x7f.one';

export const cli = new Misskey.api.APIClient({
	origin: localUrl,
	credential: 'YOUR-TOKEN-HERE'
});
