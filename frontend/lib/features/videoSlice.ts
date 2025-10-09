import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  category: string
  rating: string
  releaseYear: number
  views: number
  isPremium: boolean
}

interface VideoState {
  videos: Video[]
  trending: Video[]
  currentVideo: Video | null
  isLoading: boolean
  error: string | null
}

const initialState: VideoState = {
  videos: [],
  trending: [],
  currentVideo: null,
  isLoading: false,
  error: null,
}

export const fetchVideos = createAsyncThunk(
  'video/fetchVideos',
  async ({ category, limit = 20 }: { category?: string; limit?: number }) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    params.append('limit', limit.toString())
    
    const response = await axios.get(`${API_URL}/videos?${params}`)
    return response.data
  }
)

export const fetchTrending = createAsyncThunk(
  'video/fetchTrending',
  async () => {
    const response = await axios.get(`${API_URL}/videos/trending`)
    return response.data
  }
)

export const fetchVideo = createAsyncThunk(
  'video/fetchVideo',
  async (id: string) => {
    const response = await axios.get(`${API_URL}/videos/${id}`)
    return response.data
  }
)

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearCurrentVideo: (state) => {
      state.currentVideo = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.videos = action.payload
        state.isLoading = false
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.currentVideo = action.payload
      })
  },
})

export const { clearCurrentVideo } = videoSlice.actions
export default videoSlice.reducer