
import json

def get_font_details(font_name):
    try:
        with open('google-fonts.json', 'r') as f:
            font_data = json.load(f)
    except FileNotFoundError:
        return "Error: google-fonts.json not found."
    except json.JSONDecodeError:
        return "Error: Could not decode JSON from google-fonts.json."

    font_key = font_name
    
    if font_key in font_data:
        font_info = font_data[font_key]
        
        # Check for Latin subset
        if "latin" not in font_info.get("subsets", []):
            return f"Font '{font_name}' does not have a latin subset."

        # Extract woff2 URLs for all weights and styles
        woff2_urls = {}
        for style, variants in font_info.get("variants", {}).items():
            for weight, formats in variants.items():
                if 'woff2' in formats.get('url', {}):
                    woff2_urls[f"{style}-{weight}"] = formats['url']['woff2']
        
        # Determine general category (serif, sans-serif, cursive)
        category = font_info.get('category')
        if category == "handwriting":
            category = "cursive" # Standardize for output

        return {
            "name": font_name,
            "category": category,
            "woff2_urls": woff2_urls
        }
    else:
        return f"Font '{font_name}' not found in the data."

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        chosen_font_name = sys.argv[1]
        details = get_font_details(chosen_font_name)
        print(json.dumps(details))
    else:
        print("Usage: python3 get_font_details.py \"Font Name\"")
