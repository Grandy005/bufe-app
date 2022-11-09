import { json } from "@sveltejs/kit";

let rendelesek = {};
let kesz = {};
let counter = 1000;



export async function POST({ request }) {
   let orderID = counter--;
   let response = await request.json();

   rendelesek[orderID] = response;

   return json({
      orderID: orderID,
   })
};


// get data
export async function GET() {
   return json({
      rendelesek: rendelesek,
      kesz: kesz
   })
};


// ready
export async function PUT({ request }) {
   let adat = await request.json();
   kesz[adat] = rendelesek[adat]
   delete rendelesek[adat];
   return json({
      ok : 'ok'
   })
};

export async function DELETE({ request }) {
   let adat = await request.json();
   delete kesz[adat];
   if (adat == "debugDelete") {
      kesz = {};
      rendelesek = {}
   };

   return json({
      ok : 'ok'
   })
}