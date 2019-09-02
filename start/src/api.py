#!/usr/bin/env python3
import flask
import os

from flask import Flask, request, redirect, jsonify, abort, send_from_directory, send_file, url_for, flash, render_template


PORT = os.getenv('PORT', '5747')
DEBUG = os.getenv('DEBUG', True)

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('./static', 'favicon.ico', mimetype='image/vnd.microsoft.icon')

#@app.route('/floof/albums/<string:album>', methods=['GET'])
#def sendAlbum(album):
#    return render_template('album.html', message=album)

#@app.errorhandler(413)
#def request_entity_too_large(error):
#    return 'File Too Large', 413


if __name__ == '__main__':
    app.config['DEBUG'] = DEBUG

    app.run(host='0.0.0.0', port=PORT, threaded=True)
