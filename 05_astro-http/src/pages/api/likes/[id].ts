
import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false

export const GET: APIRoute = async({ params, request}) => {

  const postId = params.id ?? '';

  const posts = await db.select().from(Posts).where( eq(Posts.id, postId))

  if(posts.length === 0){
    const post = {
      id: postId,
      title: 'Post not found',
      likes: 0,
    }

    return new Response( JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }

  return new Response(JSON.stringify(posts.at(0)), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}



export const PUT: APIRoute = async({ params, request}) => {

  const postId = params.id ?? '';
  
  const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
  const { likes = 0 } = await request.json();

  if (posts.length === 0) {                   // Sino existe 
    const newPost = {                         // se crea
      id: postId,
      title: 'Post not found',
      likes: 0,
    };

    await db.insert(Posts).values(newPost);   // y se inserta en db Posts
    posts.push(newPost);                      // Localmente se añade en posts []
  }

  const post = posts.at(0)!;                  // Pero si existe el post obtenemos el post que se buscaba para incrementar los likes
  post.likes = post.likes + likes             // le incrementamos los likes
  await db.update(Posts).set(post).where(     // y actualizamos la db
    eq(Posts.id, postId)
  )

  return new Response('Ok!', { status: 200 })
}