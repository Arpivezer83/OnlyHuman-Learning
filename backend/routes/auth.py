# --- backend/routes/auth.py ---
from flask import Blueprint, request, jsonify
import json
import os
import bcrypt
import uuid

auth_route = Blueprint('auth', __name__)

# Users file path
USER_FILE = os.path.join(os.path.dirname(__file__), '..', 'users.json')

def load_users():
    if os.path.exists(USER_FILE):
        with open(USER_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USER_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@auth_route.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Hiányzó adatok'}), 400

    users = load_users()
    if username in users:
        return jsonify({'error': 'Felhasználónév már létezik'}), 409

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    users[username] = {
        'password': hashed,
        'id': str(uuid.uuid4())
    }
    save_users(users)
    return jsonify({'message': 'Sikeres regisztráció'})

@auth_route.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    users = load_users()
    user = users.get(username)

    if not user or not bcrypt.checkpw(password.encode(), user['password'].encode()):
        return jsonify({'error': 'Hibás belépési adatok'}), 401

    token = str(uuid.uuid4())
    user['token'] = token
    save_users(users)
    return jsonify({'message': 'Sikeres belépés', 'token': token})
