#!/usr/bin/env python3

import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

class FontsRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

def main():
    # Default to port 8000, but allow override via environment variable
    port = int(os.environ.get('PORT', 8000))
    server_address = ('', port)
    httpd = HTTPServer(server_address, FontsRequestHandler)
    print(f"Server running on port {port}...")
    print(f"Open http://localhost:{port}/index.html in your browser")
    print("Press Ctrl+C to stop the server...")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    main()