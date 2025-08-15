# LAB 2: React-Bootstrap - Movie Explorer

A React application built with React-Bootstrap that demonstrates the use of various Bootstrap components, state management, and PropTypes validation.

## Features

### 🎬 Core Functionality
- **Movie Catalog**: Browse a collection of movies with detailed information
- **Search & Filter**: Search by title/description and filter by genre
- **Sorting**: Sort movies by duration (ascending/descending)
- **Favorites**: Add/remove movies to/from favorites with localStorage persistence
- **Movie Details**: View detailed movie information in a modal
- **Request Form**: Submit movie requests with client-side validation

### 🎨 UI Components
- **Navigation**: Fixed navbar with active state highlighting
- **Hero Carousel**: Auto-playing carousel with movie banners
- **Movie Cards**: Responsive grid layout with hover effects
- **Forms**: Validated forms with error feedback
- **Modals**: Movie details display
- **Toasts**: Success/notification messages
- **Alerts**: Information and error messages

### 🔧 Technical Features
- **React Hooks**: useState, useEffect, useMemo for performance
- **PropTypes**: Complete type validation for all components
- **Local Storage**: Persistent favorites storage
- **Responsive Design**: Mobile-first approach with Bootstrap Grid
- **Performance**: Optimized filtering and sorting with useMemo

## Installation

1. **Install Dependencies**
   ```bash
   npm install react-bootstrap bootstrap prop-types
   ```

2. **Add Movie Images**
   - Place movie poster images in `public/images/` directory
   - Name them: `movie1.jpg`, `movie2.jpg`, etc.
   - Or use placeholder services like:
     - https://picsum.photos/300/400
     - https://via.placeholder.com/300x400

3. **Start Development Server**
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/
│   ├── MovieCard.js          # Individual movie display card
│   ├── SearchFilterBar.js    # Search, filter, and sort controls
│   ├── MovieDetailsModal.js  # Movie details modal
│   ├── MovieRequestForm.js   # Movie request form with validation
│   ├── HeroCarousel.js       # Hero banner carousel
│   └── Navigation.js         # Main navigation component
├── data/
│   └── movies.js             # Movie data and genres
├── App.js                    # Main application component
├── App.css                   # Custom styles
└── index.js                  # Entry point with Bootstrap CSS
```

## Component Details

### MovieCard
- Displays movie poster, title, description, metadata
- Add/remove from favorites functionality
- Details button to open modal
- Responsive design with hover effects

### SearchFilterBar
- Text search with icon
- Genre dropdown filter
- Duration sorting options
- Result count display

### MovieDetailsModal
- Full movie information display
- Poster and detailed description
- Showtimes placeholder
- Responsive modal layout

### MovieRequestForm
- Client-side validation
- Required fields: title, genre, year, duration, description
- Validation rules:
  - Year ≥ 1900
  - Duration > 0
  - Description ≥ 30 characters
- Success feedback with Alert component

### HeroCarousel
- Auto-playing carousel with 3 slides
- Movie banner images with captions
- Responsive design
- Smooth transitions

## State Management

- **useState**: Local component state
- **useEffect**: Side effects (localStorage, API calls)
- **useMemo**: Performance optimization for filtering/sorting
- **localStorage**: Persistent favorites storage

## PropTypes Validation

All components include comprehensive PropTypes validation:

```javascript
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};
```

## Bootstrap Components Used

- **Navbar**: Fixed navigation with responsive collapse
- **Carousel**: Hero banner with auto-play
- **Card**: Movie information display
- **Badge**: Genre labels
- **Button**: Action buttons with variants
- **Form**: Input controls with validation
- **InputGroup**: Search with icon
- **Modal**: Movie details display
- **Toast**: Success notifications
- **Alert**: Information and error messages
- **Row/Col**: Responsive grid layout

## Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: xs, md, lg responsive classes
- **Grid System**: Bootstrap's 12-column grid
- **Flexbox**: Modern layout techniques
- **Media Queries**: Custom responsive adjustments

## Performance Features

- **useMemo**: Optimized filtering and sorting
- **Conditional Rendering**: Only render necessary components
- **Efficient State Updates**: Minimal re-renders
- **Local Storage**: Fast data persistence

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features supported
- Responsive design for all screen sizes
- Touch-friendly mobile interface

## Future Enhancements

- **API Integration**: Connect to movie database APIs
- **User Authentication**: User accounts and personalized favorites
- **Advanced Filtering**: Multiple genre selection, year ranges
- **Pagination**: Handle large movie collections
- **Dark Mode**: Theme switching capability
- **Accessibility**: ARIA labels and keyboard navigation

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Ensure images are in `public/images/` directory
   - Check image file names match exactly
   - Use placeholder images for testing

2. **Bootstrap Styles Not Applied**
   - Verify `bootstrap/dist/css/bootstrap.min.css` is imported
   - Check for CSS conflicts in custom styles

3. **Component Not Rendering**
   - Check browser console for errors
   - Verify all imports are correct
   - Check PropTypes validation

### Development Tips

- Use React Developer Tools for debugging
- Check localStorage in browser DevTools
- Test responsive design with browser dev tools
- Validate form inputs thoroughly

## License

This project is created for educational purposes as part of the React-Bootstrap lab assignment.
