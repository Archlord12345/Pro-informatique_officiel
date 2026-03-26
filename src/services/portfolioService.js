import { supabase } from '../lib/supabaseClient'

/**
 * Portfolio/Projects Service
 * Manages projects, portfolios, and case studies
 */

const fallbackProjects = [
  {
    id: 'proj-1',
    title: 'Refonte identité visuelle - Boutique Shea',
    category: 'Infographie',
    description: 'Complete brand identity redesign including logo, color palette, and marketing materials',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    ],
    completedAt: '2024-02-15',
    client: 'Boutique Shea',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Banderole grand format - Festival Culturel',
    category: 'Impression',
    description: 'Large format banner design and production for cultural festival promotion',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    ],
    completedAt: '2024-01-20',
    client: 'Festival Culturel',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Maintenance réseau entreprise',
    category: 'Technique',
    description: 'Complete network infrastructure audit and optimization',
    images: ['https://images.unsplash.com/photo-1517694712202-14dd0c86e011?auto=format&fit=crop&w=800&q=80'],
    completedAt: '2024-01-10',
    client: 'Entreprise Tech',
    featured: false,
  },
]

export const projectService = {
  /**
   * Get all projects
   */
  async getProjects(filters = {}) {
    if (!supabase) {
      return { data: fallbackProjects, error: null }
    }

    try {
      let query = supabase.from('projects').select('*')

      if (filters.category) {
        query = query.eq('category', filters.category)
      }

      if (filters.featured) {
        query = query.eq('featured', true)
      }

      const { data, error } = await query.order('completedAt', { ascending: false })

      if (error) throw error
      return { data: data || fallbackProjects, error: null }
    } catch (error) {
      return { data: fallbackProjects, error: error.message }
    }
  },

  /**
   * Get single project by ID
   */
  async getProject(projectId) {
    if (!supabase) {
      return { data: fallbackProjects.find((p) => p.id === projectId), error: null }
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Create new project (admin only)
   */
  async createProject(projectData) {
    if (!supabase) {
      return { data: null, error: 'Not available' }
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...projectData,
            createdAt: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Update project (admin only)
   */
  async updateProject(projectId, updates) {
    if (!supabase) {
      return { data: null, error: 'Not available' }
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', projectId)
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Delete project (admin only)
   */
  async deleteProject(projectId) {
    if (!supabase) {
      return { error: 'Not available' }
    }

    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  /**
   * Get featured projects
   */
  async getFeaturedProjects(limit = 6) {
    return this.getProjects({ featured: true }).then((result) => {
      if (result.data) {
        result.data = result.data.slice(0, limit)
      }
      return result
    })
  },

  /**
   * Get projects by category
   */
  async getProjectsByCategory(category) {
    return this.getProjects({ category })
  },
}

/**
 * Testimonials/Reviews Service
 */
export const testimonialService = {
  /**
   * Get all testimonials
   */
  async getTestimonials() {
    const fallbackTestimonials = [
      {
        id: 'test-1',
        author: 'Mr. Kamga Emmanuel',
        company: 'Boutique Shea',
        content:
          "Pro-Informatique a transformé notre présence visuelle. Equipe professionnelle et créative. Highly recommended!",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'test-2',
        author: 'Mme. Fozeum Patricia',
        company: 'Festival Culturel',
        content: 'La qualité de leurs services est inégalée. ils ont livré bien avant la deadline.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'test-3',
        author: 'Mr. Taya Jean-Claude',
        company: 'Tech Solutions',
        content: 'Excellent support technique et très réactif. Un vrai partenaire de confiance.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      },
    ]

    if (!supabase) {
      return { data: fallbackTestimonials, error: null }
    }

    try {
      const { data, error } = await supabase.from('testimonials').select('*')

      if (error) throw error
      return { data: data || fallbackTestimonials, error: null }
    } catch (error) {
      return { data: fallbackTestimonials, error: error.message }
    }
  },

  /**
   * Create testimonial (admin or customer)
   */
  async createTestimonial(testimonialData) {
    if (!supabase) {
      return { data: null, error: 'Not available' }
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([
          {
            ...testimonialData,
            createdAt: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error
      return { data: data?.[0], error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },
}
