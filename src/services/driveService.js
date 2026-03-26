/**
 * Google Drive Integration Service
 * Handles file uploads, downloads, and sharing with Google Drive
 * 
 * @note gapi is loaded dynamically from Google API client library
 */
/* eslint-disable no-undef */

const GOOGLE_DRIVE_CLIENT_ID = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID || ''
const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || ''

// Google Drive API Discovery URL
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

/**
 * Initialize Google Drive API
 */
async function initGoogleDriveAPI() {
  return new Promise((resolve, reject) => {
    // Load Google API client library
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = () => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: GOOGLE_DRIVE_API_KEY,
            clientId: GOOGLE_DRIVE_CLIENT_ID,
            discoveryDocs: [DISCOVERY_DOC],
            scope: 'https://www.googleapis.com/auth/drive',
          })
          resolve(gapi)
        } catch (err) {
          reject(err)
        }
      })
    }
    script.onerror = () => reject(new Error('Failed to load Google API'))
    document.head.appendChild(script)
  })
}

export const driveService = {
  /**
   * Check if Google Drive is initialized
   */
  isConfigured() {
    return Boolean(GOOGLE_DRIVE_CLIENT_ID)
  },

  /**
   * Get Google Drive user info
   */
  async getUserInfo() {
    if (!this.isConfigured()) {
      return { data: null, error: 'Google Drive not configured' }
    }

    try {
      const response = await gapi.client.drive.about.get({
        fields: 'user',
      })
      return { data: response.result.user, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Create a folder in Google Drive
   */
  async createFolder(folderName, parentFolderId = null) {
    if (!this.isConfigured()) {
      return { data: null, error: 'Google Drive not configured' }
    }

    try {
      const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      }

      if (parentFolderId) {
        fileMetadata.parents = [parentFolderId]
      }

      const response = await gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: 'id,name,webViewLink',
      })

      return { data: response.result, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Upload file to Google Drive
   */
  async uploadFile(file, parentFolderId = null) {
    if (!this.isConfigured()) {
      return { data: null, error: 'Google Drive not configured' }
    }

    try {
      const fileMetadata = {
        name: file.name,
      }

      if (parentFolderId) {
        fileMetadata.parents = [parentFolderId]
      }

      const form = new FormData()
      form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }))
      form.append('file', file)

      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&alt=json',
        {
          method: 'POST',
          headers: new Headers({ Authorization: `Bearer ${gapi.auth.getToken().access_token}` }),
          body: form,
        }
      )

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      return { data: result, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * List files in Google Drive folder
   */
  async listFiles(folderId = null, pageSize = 10) {
    if (!this.isConfigured()) {
      return { data: [], error: 'Google Drive not configured' }
    }

    try {
      let query = "trashed = false"
      if (folderId) {
        query += ` and '${folderId}' in parents`
      }

      const response = await gapi.client.drive.files.list({
        q: query,
        spaces: 'drive',
        fields: 'files(id,name,mimeType,createdTime,modifiedTime,size,owners,webViewLink)',
        pageSize,
      })

      return { data: response.result.files || [], error: null }
    } catch (error) {
      return { data: [], error: error.message }
    }
  },

  /**
   * Share file with users/emails
   */
  async shareFile(fileId, emails, role = 'reader') {
    if (!this.isConfigured()) {
      return { error: 'Google Drive not configured' }
    }

    try {
      const promises = emails.map((email) =>
        gapi.client.drive.permissions.create({
          fileId,
          requestBody: {
            role, // 'owner', 'writer', 'reader', 'commenter'
            type: 'user',
            emailAddress: email,
          },
        })
      )

      await Promise.all(promises)
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },

  /**
   * Get file download link
   */
  async getDownloadLink(fileId) {
    if (!this.isConfigured()) {
      return { data: null, error: 'Google Drive not configured' }
    }

    try {
      const response = await gapi.client.drive.files.get({
        fileId,
        fields: 'webContentLink,webViewLink',
      })

      return { data: response.result, error: null }
    } catch (error) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Delete file from Google Drive
   */
  async deleteFile(fileId) {
    if (!this.isConfigured()) {
      return { error: 'Google Drive not configured' }
    }

    try {
      await gapi.client.drive.files.delete({
        fileId,
      })
      return { error: null }
    } catch (error) {
      return { error: error.message }
    }
  },
}

export { initGoogleDriveAPI }
