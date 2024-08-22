import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	
	await db.insert(Clients).values([
		{ id: 1, name: "Monica", age: 35, isActive: true },
		{ id: 2, name: "Maria", age: 25, isActive: true },
		{ id: 3, name: "Andres", age: 23, isActive: true },
		{ id: 4, name: "Rogelio", age: 44, isActive: true },
	]);

	const posts = await getCollection('blog');

	await db.insert(Posts).values(
		posts.map( p => ({
			id: p.id,
			title: p.data.title,
			likes: Math.round( Math.random() * 100 ),
		}))
	)


	console.log("seed executed");
}
