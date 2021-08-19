import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	keyFilename: 'googleKey.json',
	// Scopes can be specified either as an array or as a single, space-delimited string.
	scopes: ['email', 'profile'],
});

export async function getGoogleAccessToken() {
	const token = await auth.getAccessToken();
	return token;
}

(async function() {
	console.log('getting access token');
	console.log(await getGoogleAccessToken());
	console.log('bye');
})();
