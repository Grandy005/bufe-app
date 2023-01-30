import { redirect, fail } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}

export const actions = {
	default: async ({ locals, request }) => {
		let body = Object.fromEntries(await request.formData());
		body.email = body.email.concat('@kkszki.hu');
		console.log(body);
		try {
			await locals.pb.collection('users').create({...body});
		} catch (err) {
			console.log(err.data.data);

			if (err.data.data.password) { // jelszoval van baj
				if (err.data.data.password.code == 'validation_length_out_of_range') {
					return fail(400, { name: body.name, email: body.email, error: 'A jelszavad legalább 8 és maximum 72 karakter lehet.' });
				}
			}
			else if (err.data.data.email.code) { // email-lel van baj
				return fail(400, { name: body.name, email: body.email, error: 'Az email helytelen vagy már használatban van.' });
			}
			else {
				return fail(400, { name: body.name, email: body.email, error: 'Hiba!' });
			}
		}

		throw redirect(303, '/login');
	}
};