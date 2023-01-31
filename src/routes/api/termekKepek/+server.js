export async function GET({ locals, fetch, url }) {
    const id = url.searchParams.get('termek');
    const record = await locals.pb.collection('termekek').getOne(id);

    const kep = await fetch(`http://127.0.0.1:8090/api/files/termekek/${id}/${record.kep}`);

    return new Response(await kep.blob(), {
        headers: {
            'Content-Type': 'image/*'
        }
    });
}