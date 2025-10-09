import { render, screen } from '@testing-library/react'
import VideoCard from '../../components/VideoCard'

const mockVideo = {
  _id: '1',
  title: 'Test Movie',
  thumbnail: '/test-thumbnail.jpg',
  duration: 7200,
  rating: 'PG-13',
  releaseYear: 2023,
  isPremium: false
}

describe('VideoCard', () => {
  it('renders video information', () => {
    render(<VideoCard video={mockVideo} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('PG-13')).toBeInTheDocument()
  })

  it('shows premium badge for premium content', () => {
    const premiumVideo = { ...mockVideo, isPremium: true }
    render(<VideoCard video={premiumVideo} />)
    
    expect(screen.getByText('PREMIUM')).toBeInTheDocument()
  })
})