from flask import Blueprint, request, jsonify
import os
import json

profile_route = Blueprint('profile', __name__)
PROFILE_PATH = 'data/profile.json'

@profile_route.route('/api/profile', methods=['GET'])
def get_profile():
    if os.path.exists(PROFILE_PATH):
        with open(PROFILE_PATH, 'r', encoding='utf-8') as f:
            return jsonify(json.load(f))
    return jsonify({})

@profile_route.route('/api/profile', methods=['POST'])
def save_profile():
    data = request.get_json()
    with open(PROFILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return jsonify({"message": "Profil elmentve ✅"})
