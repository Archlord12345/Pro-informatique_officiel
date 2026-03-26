import { supabase } from '../lib/supabaseClient'

const fallbackMedia = [
  {
    id: 'local-1',
    title: 'Atelier maintenance PC',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    summary: 'Intervention complete sur poste bureautique.',
  },
  {
    id: 'local-2',
    title: 'Conception flyer evenementiel',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
    summary: 'Mise en page professionnelle et impression haute qualite.',
  },
]

const fallbackComments = {
  'local-1': [],
  'local-2': [],
}

export const fetchMedia = async () => {
  if (!supabase) {
    return fallbackMedia
  }

  const { data, error } = await supabase.from('media_posts').select('*').order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export const fetchCommentsByMedia = async (mediaId) => {
  if (!supabase) {
    return fallbackComments[mediaId] ?? []
  }

  const { data, error } = await supabase
    .from('media_comments')
    .select('*')
    .eq('media_id', mediaId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export const addComment = async ({ mediaId, fullName, email, message }) => {
  if (!supabase) {
    const comment = {
      id: `${mediaId}-${Date.now()}`,
      media_id: mediaId,
      full_name: fullName,
      email,
      message,
      created_at: new Date().toISOString(),
    }
    fallbackComments[mediaId] = [comment, ...(fallbackComments[mediaId] ?? [])]
    return comment
  }

  const { data, error } = await supabase
    .from('media_comments')
    .insert({
      media_id: mediaId,
      full_name: fullName,
      email,
      message,
    })
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}
