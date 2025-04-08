from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/checkin/<projectId>/<qty>', methods=['GET'])
def checkIn_hardware(projectId, qty):
    message = f"{qty} hardware checked in for project {projectId}"
    return jsonify({"message": message})

@app.route('/checkout/<projectId>/<qty>', methods=['GET'])
def checkOut_hardware(projectId, qty):
    message = f"{qty} hardware checked out for project {projectId}"
    return jsonify({"message": message})

@app.route('/join/<projectId>', methods=['GET'])
def joinProject(projectId):
    message = f"Joined project {projectId}"
    return jsonify({"message": message})

@app.route('/leave/<projectId>', methods=['GET'])
def leaveProject(projectId):
    message = f"Left project {projectId}"
    return jsonify({"message": message})

import os
from flask import send_from_directory

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join('build', path)):
        return send_from_directory('build', path)
    return send_from_directory('build', 'index.html')


if __name__ == '__main__':
    app.run(debug=True)