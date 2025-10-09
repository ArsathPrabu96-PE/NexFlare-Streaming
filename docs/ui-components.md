# UI Components Specification

## Button Component
```jsx
// Primary Button
<Button variant="primary" size="lg">
  Play Now
</Button>

// Secondary Button
<Button variant="secondary" size="md">
  Add to List
</Button>

// Ghost Button
<Button variant="ghost" size="sm">
  Learn More
</Button>
```

## Video Card Component
```jsx
<VideoCard
  title="Movie Title"
  thumbnail="/images/thumbnail.jpg"
  duration="2h 15m"
  rating="PG-13"
  year={2023}
  isPremium={true}
  onPlay={() => {}}
  onAddToList={() => {}}
/>
```

## Video Player Component
```jsx
<VideoPlayer
  src="/videos/movie.m3u8"
  poster="/images/poster.jpg"
  title="Movie Title"
  autoplay={false}
  controls={true}
  quality={['auto', '1080p', '720p', '480p']}
  onProgress={(time) => {}}
  onEnded={() => {}}
/>
```

## Navigation Header
```jsx
<Header>
  <Logo />
  <Navigation>
    <NavLink href="/">Home</NavLink>
    <NavLink href="/browse">Browse</NavLink>
    <NavLink href="/my-list">My List</NavLink>
  </Navigation>
  <UserMenu>
    <SearchButton />
    <ProfileDropdown />
  </UserMenu>
</Header>
```

## Content Carousel
```jsx
<Carousel title="Trending Now">
  {videos.map(video => (
    <VideoCard key={video.id} {...video} />
  ))}
</Carousel>
```

## Modal Component
```jsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <h2>Video Details</h2>
  </ModalHeader>
  <ModalBody>
    <VideoPlayer />
    <VideoInfo />
  </ModalBody>
</Modal>
```

## Form Components
```jsx
// Input Field
<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>

// Form Container
<Form onSubmit={handleSubmit}>
  <Input type="email" label="Email" />
  <Input type="password" label="Password" />
  <Button type="submit">Sign In</Button>
</Form>
```

## Layout Components
```jsx
// Container
<Container maxWidth="xl">
  <content />
</Container>

// Grid Layout
<Grid cols={6} gap={4}>
  <VideoCard />
  <VideoCard />
  <VideoCard />
</Grid>

// Stack Layout
<Stack direction="vertical" spacing={4}>
  <Carousel />
  <Carousel />
  <Carousel />
</Stack>
```