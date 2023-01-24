import { redirect, fail } from '@sveltejs/kit';

export function load({ locals }) { // ha bevagyunk jelentkezve dobjon át a főoldalra
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}

export const actions = { // Bejelentkezés, megkapja az oldal FORM data-ját és az alapján beléptet
	default: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		console.log(body);
		try {
			await locals.pb.collection('users').authWithPassword(body.email.concat('@kkszki.hu'),body.password);
		} catch (err) {
			console.log(err.data);
			return fail(400, { email: body.email, error: 'Helytelen e-mail cím vagy jelszó!' });
		}

		throw redirect(303, '/');
	}
};
