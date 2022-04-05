// this is placed in the back-end because deleting a user can only be done with the private service_role key
// https://supabase.com/docs/reference/javascript/auth-api-deleteuser

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE ?? ""
const supabaseDANGER = createClient(supabaseUrl, supabaseServiceRole)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessTokenJwt = req.headers.authorization?.split(" ")?.[1] ?? null
  if (accessTokenJwt === null) return res.status(401).json(null)

  // this will validate the provided jwt
  const { user, error } = await supabaseDANGER.auth.api.getUser(accessTokenJwt)

  if (error) return res.status(401).json(null)
  if (user === null) return res.status(401).json(null)

  // we need to delete everything where the user id could be used as a foreign key (directly or indirectly)
  // xxx if only supabase could provide something more efficient...
  const deleteBlockings = supabaseDANGER
    .from(`blockings`)
    .delete()
    .or(`user_id_1.eq.${user.id}, user_id_2.eq.${user.id}`)
  const deleteFriendships = supabaseDANGER
    .from(`friendships`)
    .delete()
    .or(`user_id_1.eq.${user.id}, user_id_2.eq.${user.id}`)
  const deleteGratitudes = supabaseDANGER
    .from(`gratitudes`)
    .delete()
    .eq(`user_id`, user.id)
  const deleteProfile = supabaseDANGER
    .from(`profiles`)
    .delete()
    .eq(`id`, user.id)

  await Promise.all([deleteBlockings, deleteFriendships, deleteGratitudes])
  await deleteProfile

  const { error: errorAtDeleteUser } = await supabaseDANGER.auth.api.deleteUser(user.id)

  if (errorAtDeleteUser) {
    // ex { message: 'Database error deleting user', status: 500 }
    return res.status(500).json(null)
  }

  return res.status(200).json(null)
}
