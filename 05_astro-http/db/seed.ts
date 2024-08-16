import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	
	await db.insert(Clients).values([
		{ id: 1, name: "Monica", age: 35, isActive: true },
		{ id: 2, name: "Maria", age: 25, isActive: true },
		{ id: 3, name: "Andres", age: 23, isActive: true },
		{ id: 4, name: "Rogelio", age: 44, isActive: true },
	]);


	console.log("seed executed");
}
