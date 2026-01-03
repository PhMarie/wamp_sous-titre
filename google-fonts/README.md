# Google Fonts Showcase

A web interface for browsing and previewing Google Fonts with enhanced CSS generation capabilities.
Online demo : https://www.sous-titre.com/google-fonts/
## Features

### Core Features
- **Browse 1000+ Google Fonts** organized by category (Sans Serif, Serif, Cursive, Monospace, Display)
- **Advanced Search** with real-time filtering
- **Live Preview** with customizable preview text
- **Enhanced CSS Generation** with automatic variant detection
- **Direct Google Fonts links** for detailed information
- **Responsive Design** optimized for all screen sizes
- **Performance Optimized** with dynamic font loading

### Enhanced CSS Output
- **Automatic Variant Detection**: Detects italic, medium, semibold, and other weights
- **Comprehensive CSS Classes**: Generates classes for all available font variants
- **Smart Class Generation**: Creates `.font-italic`, `.font-medium`, `.font-italic-bold`, etc.
- **Professional Format**: Clean, organized CSS with proper comments and structure

### Special Features
- **CAP Font Optimization**: Special handling for all-caps fonts with size adjustments
- **Dark Theme Support**: Proper styling for dark mode
- **Font Size Preservation**: Maintains user-selected font sizes across font changes
- **Global Size Control**: Adjust all card text sizes simultaneously

## Installation & Usage

### Prerequisites
- Python 3.x (for development)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Running the Web Interface

1. **Start the web server:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Access the interface:**
   - Open `http://localhost:8000/index.html` in your browser

3. **Using the interface:**
   - **Search**: Type in the search box to filter fonts by name
   - **Categories**: Click category buttons to filter by font type
   - **Preview**: Change the preview text to see how fonts look with your content
   - **Copy CSS**: Click "Copy CSS" to get comprehensive @font-face CSS with all available variants
   - **View on Google**: Click to see the font on Google Fonts website
   - **Font Size**: Adjust preview text size with + button
   - **Global Size**: Increase all card text sizes with global control

## Project Structure

- `index.html` - Main web interface with enhanced features
- `styles.css` - CSS styles with CAP font optimizations
- `google-fonts.json` - Comprehensive font metadata database
- `get_font_details.py` - Font details extraction script
- `parse_fonts.py` - Font data parsing script
- `simple_server.py` - Simple development server
- `README.md` - Project documentation

## Technical Details

### Font Data
The application loads font data from `google-fonts.json`, which contains:
- Font names and categories
- Available subsets (filtered to show only Latin subset fonts)
- Variant information (weights and styles from 100-900)
- WOFF2 URL patterns for all variants

### CSS Generation
The enhanced "Copy CSS" feature generates comprehensive `@font-face` declarations with:
- Font family definition with fallback
- WOFF2 format source URLs
- `font-display: swap` for better performance
- CSS variables for easy theming
- Utility classes for all available weights and styles
- Automatic detection of italic and weight variants

### Key Enhancements

- **CAP Font Handling**: Special 18px size for CAP category fonts
- **Variant Detection**: Automatic detection of italic and weight variants
- **Comprehensive CSS**: Classes for regular, bold, italic, medium, semibold, etc.
- **Smart Fallbacks**: Graceful handling of missing variants
- **Professional Format**: Clean, well-commented CSS output

## Recent Improvements

### CAP Font Optimization
- **Size Adjustment**: CAP fonts at 18px (1.5x longer than previous 12px)
- **Special Cases**: Extra-long CAP fonts at 16px
- **Class-Based Targeting**: Reliable `.cap-font-name` class
- **Multiple Selectors**: High-specificity CSS rules

### CSS Output Enhancement
- **Automatic Detection**: Examines @font-face rules for available variants
- **Dynamic Generation**: Creates appropriate CSS classes automatically
- **Comprehensive Coverage**: Supports all font weights and styles
- **User-Friendly**: More styling options for users

### Dark Theme Support
- **Button Styling**: Proper dark theme colors for global size button
- **Consistent Design**: Matches font category tag colors
- **Hover States**: Interactive feedback in dark mode

## Limitations

- Only shows fonts with Latin subset support
- Basic error handling for JSON loading
- Limited to loading visible fonts for performance
- Currently loads comprehensive weight range (100-900) for complete CSS

## License

This project uses Google Fonts data and is intended for educational and demonstration purposes. Always check Google Fonts license terms for production use.

## Credits

- Google Fonts for the font data and API
- Enhanced with additional features and optimizations