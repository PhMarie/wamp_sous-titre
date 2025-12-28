# Google Fonts Showcase

A web interface for browsing and previewing Google Fonts with the ability to generate CSS code.

## Features

- **Browse 1000+ Google Fonts** organized by category (Sans Serif, Serif, Cursive, Monospace)
- **Search functionality** to find specific fonts quickly
- **Live preview** with customizable preview text
- **One-click CSS generation** for easy integration into your projects (now with multi-weight support!)
- **Direct links** to Google Fonts pages for more details
- **Responsive design** that works on mobile and desktop
- **Multi-weight font loading** - Loads both regular (400) and bold (700) weights for complete font support
- **Enhanced font detection** - Accurate fallback detection with proper space handling
- **Monospace font support** - Includes code fonts like Roboto Mono

## Installation & Usage

### Prerequisites
- Python 3.x
- Modern web browser

### Running the Web Interface

1. **Start the web server:**
   ```bash
   python3 test_web_interface.py
   ```

2. **Access the interface:**
   - The script will automatically open your browser to `http://localhost:8000`
   - If not, manually open that URL in your browser

3. **Using the interface:**
   - **Search**: Type in the search box to filter fonts by name
   - **Categories**: Click category buttons to filter by font type
   - **Preview**: Change the preview text to see how fonts look with your content
   - **Copy CSS**: Click "Copy CSS" to get ready-to-use @font-face CSS
   - **View on Google**: Click to see the font on Google Fonts website

### Alternative: Simple Python Server

If you prefer not to use the test script, you can run:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html` in your browser.

## Project Structure

- `index.html` - Main web interface with purple fallback detection
- `google-fonts.json` - Font metadata database
- `test_web_interface.py` - Test server script
- `test_font_loading.html` - Font loading test page
- `test_fallback_detection.html` - Fallback detection demonstration
- `get_font_details.py` - Original font details script
- `parse_fonts.py` - Original font parsing script
- `fonts/` - Directory for downloaded font files
- `*.css` - Generated CSS files
- `README.md` - This documentation

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

### Features

- **Real font previews** - Loads actual Google Fonts for accurate previews
- **Purple fallback detection** - Failed font loads show distinctive purple text with "[Fallback Font]" label
- **Performance optimized** - Loads only visible fonts (limited to 20 at a time)
- **Dynamic font loading** - Fonts load as you browse and search
- **Automatic fallback detection** - System detects when fonts fail to load
- **1000+ Google Fonts** organized by category (Sans Serif, Serif, Cursive)
- **Search functionality** to find specific fonts quickly
- **Live preview** with customizable preview text
- **One-click CSS generation** for easy integration into your projects
- **Direct links** to Google Fonts pages for more details
- **Responsive design** that works on mobile and desktop

### Limitations
- Only shows fonts with Latin subset support
- Basic error handling for JSON loading
- Limited to loading 20 fonts at a time for performance
- Currently loads only regular (400) weight for each font family

### ✅ Fixed Issues

#### Roboto Variant Issue - COMPLETELY RESOLVED ✅
**Problem**: Only Roboto Regular works, other Roboto variants (Condensed, Slab, Flex, Serif) show fallback fonts.

**Root Causes Identified and Fixed**:

1. **Font Name Encoding Issue (FIXED)**
   - **Problem**: We were using `encodeURIComponent()` which converts spaces to `%20`, but Google Fonts API expects `+` for spaces
   - **Solution**: Changed to use direct string replacement: `fontName.replace(/ /g, '+')`
   - **Status**: ✅ FIXED

2. **Font Detection Logic Issue (FIXED)**
   - **Problem**: Our fallback detection was looking for exact font name matches, but browsers report font families without spaces (e.g., "RobotoCondensed" instead of "Roboto Condensed")
   - **Solution**: Added space removal for font name comparison: `fontName.replace(/\s+/g, '')`
   - **Status**: ✅ FIXED

3. **Multi-Weight Loading (FIXED)**
   - **Problem**: We were only loading weight 400 for each font family
   - **Impact**: Font variants like Bold (700) or Italic won't work properly
   - **Solution**: Load multiple weights using: `https://fonts.googleapis.com/css2?family=Roboto:wght@400;700`
   - **Status**: ✅ FIXED - Now loading both regular and bold weights for all fonts

#### Roboto Mono Filtering (FIXED)
**Problem**: Roboto Mono shows fallback font.

**Cause**: Roboto Mono has category `monospace`, which was filtered out by our category filtering logic.

**Solution**: Added `monospace` to allowed categories

**Status**: ✅ FIXED - Monospace fonts are now fully supported

### Fixed Issues

#### Font Name Encoding
**Before**: `encodeURIComponent('Roboto Condensed')` → `Roboto%20Condensed` ❌
**After**: `'Roboto Condensed'.replace(/ /g, '+')` → `Roboto+Condensed` ✅

#### Font Detection Logic
**Before**: Looking for "Roboto Condensed" in computed font family
**After**: Looking for "RobotoCondensed" (no spaces) in computed font family

These fixes should resolve the Roboto variant loading issues!

### Future Enhancements

1. **Multi-weight font loading** - Load multiple weights (400, 700, etc.) for each font family
2. **Italic variant support** - Detect and load italic variants when needed
3. **Font variant detection** - Automatically detect what weights/styles are available for each font
4. **Advanced font preview** - Show multiple weights/styles in the preview
5. **Font comparison tool** - Compare multiple fonts side by side
6. **Performance optimization** - Implement lazy loading for fonts
7. **Offline font caching** - Cache loaded fonts for better performance

## Future Enhancements

Possible improvements for the future:
- Load actual font files for true previews
- Add font weight/style selection
- Implement font comparison feature
- Add favorite/bookmark functionality
- Export multiple fonts as a CSS bundle
- Add dark mode support
- Implement pagination for large font lists

## License

This project uses Google Fonts data and is intended for educational and demonstration purposes. Always check Google Fonts license terms for production use.

## Credits

- Google Fonts for the font data and API
- Created as part of the Mistral Vibe coding assistant demonstration