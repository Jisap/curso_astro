import { db, Product, ProductImage, Role, User } from 'astro:db';
import { v4 as UUID } from 'uuid'
import bcrypt from 'bcryptjs'
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
	
	const roles = [
		{ id: 'admin', name: 'Administrador' },
		{ id: 'user', name: 'Usuario de sistema' },
	];

	const johnDoe = {
		id: 'ABC-123-JOHN', // UUID(),
		name: 'John Doe',
		email: 'john@doe.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin',
	};

	const janeDoe = {
		id: 'ABC-123-JANE', // UUID(),
		name: 'Jane Doe',
		email: 'jane@doe.com',
		password: bcrypt.hashSync('123456'),
		role: 'user',
	};

	await db.insert(Role).values(roles);															// Inserta los roles en la tabla de Role
	await db.insert(User).values([johnDoe, janeDoe]);									// Inserta los usuarios en la tabla de User


	const queries: any = []

	seedProducts.forEach((p) => {                      // Para cada producto del seedProducts

		const product ={															   // Creamos un objeto producto
			id: UUID(),
			stock: p.stock,
			slug: p.slug,
			price: p.price,
			sizes: p.sizes.join(','),
			type: p.type,
			tags: p.tags.join(','),
			title: p.title,
			description: p.description,
			gender: p.gender,
			user: johnDoe.id,
		};

		queries.push(db.insert(Product).values(product));	// E insertamos cada producto en la tabla de Product

		p.images.forEach((img) => { 									    // Para cada imagen del producto	

			const image = {
				id: UUID(),
				image: img,
				productId: product.id,
			};
			
			queries.push(db.insert(ProductImage).values(image)); // insertamos cada imagen en la tabla de ProductImage
		})
	})

	await db.batch(queries); 																 // Al final se ejecutan todos los queries
}

