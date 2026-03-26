import { supabase, hasSupabaseConfig } from '../lib/supabaseClient'

/**
 * Authentication Service
 * Handles user registration, login, logout, and session management
 */

export const authService = {
  /**
   * Sign up a new user
   */
  async signUp(email, password, metadata = {}) {
    if (!hasSupabaseConfig) {
      console.error('Supabase not configured')
      return { error: 'Service not available' }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Sign in user with email and password
   */
  async signIn(email, password) {
    if (!hasSupabaseConfig) {
      console.error('Supabase not configured')
      return { error: 'Service not available' }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Sign out current user
   */
  async signOut() {
    if (!supabase) return { error: 'Service not available' }

    const { error } = await supabase.auth.signOut()
    if (error) return { error: error.message }
    return { error: null }
  },

  /**
   * Get current session
   */
  async getSession() {
    if (!supabase) return { data: null }

    const { data, error } = await supabase.auth.getSession()
    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Get current user
   */
  async getUser() {
    if (!supabase) return { data: null }

    const { data, error } = await supabase.auth.getUser()
    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Reset password
   */
  async resetPassword(email) {
    if (!hasSupabaseConfig) {
      return { error: 'Service not available' }
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Update user password
   */
  async updatePassword(newPassword) {
    if (!supabase) return { error: 'Service not available' }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Watch auth state changes
   */
  onAuthStateChange(callback) {
    if (!supabase) return () => {}

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })

    return data.subscription.unsubscribe
  },
}

/**
 * User Profile Service
 * Handles user profile data in the database
 */
export const profileService = {
  /**
   * Create or update user profile
   */
  async upsertProfile(userId, profile) {
    if (!supabase) return { error: 'Service not available' }

    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: userId,
          ...profile,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Get user profile
   */
  async getProfile(userId) {
    if (!supabase) return { data: null }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) return { data: null, error: error.message }
    return { data, error: null }
  },

  /**
   * Get all admin users
   */
  async getAdminUsers() {
    if (!supabase) return { data: [] }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'admin')

    if (error) return { data: [], error: error.message }
    return { data, error: null }
  },
}
