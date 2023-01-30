let splash = [
	'Az otthon készített étel sokkal egészségesebb.',
	'Ezen az oldalon nem pörög a cookie.',
	'Adsz egy csókot?',
	'Valaki hozzányúlt a spagettimhez!',
	'Nyisd ki a szád, jön a kaja gránát!',
	'A tényekben nem szabad hinni.',
	'www.kkszki.{!straight}',
	'Órán telefonozni szigorúan tilos.',
	'6 ember rendelt az appomon ezen a héten!',
	'Nuraphone rossz.',
	'Puppy linux < bármelyik másik distro.',
	'Szigma himek nem használnak classokat.',
	'Pár rendelés és utóléred a kövér macskáimat.',
	'Tiborral ne húzz ujjat.',
	'App bepukkasztva',
	'Release date: valamikor',
	'Májkölszoft Binbóz',
	'Általam kedvelt tanároknak jónapot kivánok!',
	'🅱️ortfolio.',
	'Balu Mester > Sajt32',
	'Húszezresből mennyi van?',
	'““”̿ ̿ ̿ ̿ ̿’̿’̵͇̿̿з=(*‿*)=ε/̵͇̿̿/̿ ̿ ̿ ̿ ̿’““'

];

export async function load({ locals }) {
	const records = structuredClone(await locals.pb.collection('termekek').getFullList());

	const random = records.map(record => {
		return record.termek;
	});

	return {
		'randomTermek': encodeURI(random[Math.floor(Math.random() * random.length)]),
		'splash': splash[Math.floor(Math.random() * splash.length)]
	};
}