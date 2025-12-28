
import json

def get_popular_fonts(font_data):
    sans_serif_fonts = []
    serif_fonts = []
    cursive_fonts = []

    for font_name, font_info in font_data.items():
        category = font_info.get('category')
        if category == 'sans-serif' and len(sans_serif_fonts) < 5:
            sans_serif_fonts.append({'name': font_name, 'category': category})
        elif category == 'serif' and len(serif_fonts) < 5:
            serif_fonts.append({'name': font_name, 'category': category})
        elif category == 'handwriting' and len(cursive_fonts) < 5: # "handwriting" is often used for cursive in Google Fonts
            cursive_fonts.append({'name': font_name, 'category': "cursive"}) # Renaming category for user
        
        if len(sans_serif_fonts) == 5 and len(serif_fonts) == 5 and len(cursive_fonts) == 5:
            break
    
    return sans_serif_fonts, serif_fonts, cursive_fonts

def main():
    try:
        with open('google-fonts.json', 'r') as f:
            font_data = json.load(f)
    except FileNotFoundError:
        print("Error: google-fonts.json not found. Please ensure it's in the same directory.")
        return
    except json.JSONDecodeError:
        print("Error: Could not decode JSON from google-fonts.json. The file might be corrupted.")
        return

    sans_serif, serif, cursive = get_popular_fonts(font_data)

    print("Curated list of 15 most popular Google Fonts:")
    print("\n--- Sans-serif Fonts ---")
    for i, font in enumerate(sans_serif):
        demo_link = f"https://fonts.google.com/specimen/{font['name'].replace(' ', '+')}"
        print(f"{i+1}. {font['name']} ({font['category']}) - Demo link: {demo_link}")

    print("\n--- Serif Fonts ---")
    for i, font in enumerate(serif):
        demo_link = f"https://fonts.google.com/specimen/{font['name'].replace(' ', '+')}"
        print(f"{i+1}. {font['name']} ({font['category']}) - Demo link: {demo_link}")

    print("\n--- Cursive Fonts ---")
    for i, font in enumerate(cursive):
        demo_link = f"https://fonts.google.com/specimen/{font['name'].replace(' ', '+')}"
        print(f"{i+1}. {font['name']} ({font['category']}) - Demo link: {demo_link}")

if __name__ == "__main__":
    main()
