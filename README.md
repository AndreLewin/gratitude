This is a [Next.js](https://nextjs.org/) project. It uses [Typescript](https://www.typescriptlang.org/) and [Mantine](https://mantine.dev/) for some useful components (popover, modal, ...) and hooks (useViewportSize, ...). The project is hosted on [Vercel](https://vercel.com/).

This website uses [Supabase](https://supabase.com/) (Back-end As A Service). It handles authentication and automatically generates a REST API based on PostgreSQL tables that I have defined. This project (the gratitude app) is largely done to test the potential of Supabase.

Supabase is used with [Row Level Security](https://www.youtube.com/watch?v=Ow_Uzedfohk) architecture. That means that the client directly communicates with the database with an anonymous key that is public. Security is achieved by writing [PostgreSQL policies](https://www.postgresql.org/docs/current/sql-createpolicy.html) directly in Supabase's user interface.

For example, this policy allows users to read a message from their friends if the message has the "friend only" visibility level (3)
```sql
((user_id IN ( SELECT f.user_id_2
   FROM friendships f
  WHERE (f.user_id_1 = uid())
UNION
 SELECT f.user_id_1
   FROM friendships f
  WHERE (f.user_id_2 = uid()))) AND (visibility_id = 3))
```

Writing policies for all tables takes a lot of time to do it properly and safely. The [JS/TS SDK](https://supabase.com/docs/reference/javascript/supabase-client) of Supabase is quite limited. For example, it is not possible to fuzzy search on several fields at the same time. It is also not possible to return an object combining data from two different tables if the first table has no foreign key relation to the second table. The only way to bypass this limitation is by writing manually a PL/pgSQL function, that can then be invoked by the SDK. This takes time and is hard to maintain. It would rather do that in TypeScript.

In most Next projects, when accessing the first page, data is fetched inside `getServerSideProps`. But since the back-end of the Next App (hosted by Vercel) is not located at the same place as the database (in Supabase servers) it does not provide much a difference in time if it is fetched by the back-end or the client. That's why `useEffect` is used for fetching in most cases, that way we can start rendering (and improve Time to First Draw). While the data is being fetched, a loader is displayed where the data is needed.

In my future projects, I will still use Supabase since it is an amazing tool for authentication and for managing a SQL database quickly. However, I will NOT use the RLS architecture. Instead, I will keep the anonymous key private for the Next back-end only, and I will make api routes (in the /api/ folder) where the objects will be built to be immediately ready to use for the front-end. 

