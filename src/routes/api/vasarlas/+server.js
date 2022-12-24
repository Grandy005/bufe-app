import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

const admins = ['rdzc6b3jes1k8am','u1fy74rt1m48tx1'];
let bejovo = {};
let kesz = {};
let counter = 0;

// get data
export async function GET({ locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id))
			return json({
				'bejovo': bejovo,
				'kesz': kesz
			});
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}
// rendeles logic
export async function POST({ request, locals }) {
	counter++;
	const data = await request.json();
	let name = locals.pb.authStore.baseModel.name;
	bejovo[counter] = {'name': name, items: {}};

	for (let i = 0; i < Object.keys(data).length; i++) { // atmegy minden key-en az obejtben
		const record = await locals.pb.collection('termekek').getFirstListItem(`termek = "${Object.keys(data)[i]}"`); // visszater a termek recordjaval
		const darab = data[Object.keys(data)[i]][1];
		const osszeg = record.ar * darab; // ár validálás

		bejovo[counter].items[Object.keys(data)[i]] = [ darab, osszeg ]; // rendelesekhez hozzaad
		locals.pb.collection('termekek').update(record.id, { 'darab': record.darab - darab }); // Rendelt termekek darabszamat kivonja az adatbazisbol
	}

	// elraktaroz adatbazisban
	let elozmenyRecord = await locals.pb.collection('rendeles_elozmeny').create({ 'rendeles': bejovo[counter], 'rendelo': locals.pb.authStore.baseModel.id });
	bejovo[counter].id = elozmenyRecord.id;

	return json({
		orderID: counter
	});
}

// rendeles folyamatban
export async function PUT({ request, locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id)) {
			let adat = await request.json();
			kesz[adat] = bejovo[adat];
			delete bejovo[adat];
		
			locals.pb.collection('rendeles_elozmeny').update(kesz[adat].id, { 'status': 'folyamatban' }); // update rendeles status
		
			return json({
				ok : 'ok'
			});
		}
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}

// rendeles kesz
export async function PATCH({ request, locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id)) {
			let adat = await request.json();

			locals.pb.collection('rendeles_elozmeny').update(kesz[adat].id, { 'status': 'kesz' }); // update rendeles status
		
			delete kesz[adat];
		
			return json({
				ok : 'ok'
			});
		}
	} catch {
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}

export async function DELETE({ request, locals }) {
	try {
		if (admins.includes(locals.pb.authStore.baseModel.id)) {
			let adat = await request.json();

			if (adat.type == 'kesz') {
				locals.pb.collection('rendeles_elozmeny').update(kesz[adat.item].id, { 'status': 'torolve' }); // update rendeles status
				delete kesz[adat.item];
			} else {
				locals.pb.collection('rendeles_elozmeny').update(bejovo[adat.item].id, { 'status': 'torolve' }); // update rendeles status
				delete bejovo[adat.item];
			}
		
			return json({
				ok : 'ok'
			});
		}
	} catch (err) {
		console.log(err)
		throw error(401, { 'error': 'Nincs hozzáférésed!' });
	}

}