import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map={
        '.manifest': 'text/cache-manifest',
	'.html': 'text/html',
        '.png': 'image/png',
	'.jpg': 'image/jpg',
	'.svg':	'image/svg+xml',
	'.css':	'text/css',
	'.js':	'application/x-javascript',
	'.mjs': 'text/javascript',
	'': 'application/octet-stream', # Default
    }

httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()
