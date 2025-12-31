# Google Fonts Showcase

A web interface for browsing and previewing Google Fonts with CSS generation capabilities.

## Features

- **Browse 1000+ Google Fonts** organized by category (Sans Serif, Serif, Cursive, Monospace)
- **Search functionality** to find specific fonts quickly
- **Live preview** with customizable preview text
- **One-click CSS generation** for easy integration into projects
- **Direct links** to Google Fonts pages for more details
- **Responsive design** that works on mobile and desktop
- **Multi-weight font loading** (regular 400 and bold 700 weights)
- **Monospace font support** including code fonts

## Installation & Usage

### Prerequisites
- Python 3.x
- Modern web browser

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
   - **Copy CSS**: Click "Copy CSS" to get ready-to-use @font-face CSS
   - **View on Google**: Click to see the font on Google Fonts website

## Project Structure

- `index.html` - Main web interface
- `styles.css` - CSS styles for the application
- `google-fonts.json` - Font metadata database
- `get_font_details.py` - Font details extraction script
- `parse_fonts.py` - Font data parsing script
- `simple_server.py` - Simple development server
- `fonts/` - Directory for downloaded font files
- `README.md` - Project documentation

## Technical Details

### Font Data
The application loads font data from `google-fonts.json`, which contains:
- Font names and categories
- Available subsets (filtered to show only Latin subset fonts)
- Variant information (weights and styles)
- WOFF2 URL patterns

### CSS Generation
The "Copy CSS" feature generates proper `@font-face` declarations with:
- Font family definition
- WOFF2 format source
- `font-display: swap` for better performance
- CSS variables for easy theming
- Utility classes for quick usage

### Key Features

- **Real font previews** - Loads actual Google Fonts for accurate previews
- **Purple fallback detection** - Failed font loads show distinctive purple text
- **Performance optimized** - Loads only visible fonts
- **Dynamic font loading** - Fonts load as you browse and search
- **Automatic fallback detection** - System detects when fonts fail to load

## Limitations

- Only shows fonts with Latin subset support
- Basic error handling for JSON loading
- Limited to loading 20 fonts at a time for performance
- Currently loads regular (400) and bold (700) weights for each font family

## License

This project uses Google Fonts data and is intended for educational and demonstration purposes. Always check Google Fonts license terms for production use.

## Credits

- Google Fonts for the font data and API