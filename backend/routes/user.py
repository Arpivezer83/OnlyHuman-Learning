from flask import Blueprint, request, jsonify
import os
import json

user_route = Blueprint('user', __name__)

USER_FILE = os.path.join(os.path.dirname(__file__), '..', 'users', 'users.json')
os.makedirs(os.path.dirname(USER_FILE), exist_ok=True)

# Ha nincs user file, hozzuk létre üresen
if not os.path.exists(USER_FILE):
    with open(USER_FILE, "w") as f:
        json.dump({}, f)

def load_users():
    with open(USER_FILE, "r") as f:
        return json.load(f)

def save_users(data):
    with open(USER_FILE, "w") as f:
        json.dump(data, f)

@user_route.route("/user/<user_id>", methods=["GET"])
def get_user(user_id):
    users = load_users()
    user = users.get(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@user_route.route("/user/<user_id>", methods=["POST"])
def create_or_update_user(user_id):
    data = request.json
    users = load_users()
    user = users.get(user_id, {"xp": 0, "goals": {"english": 5, "math": 5, "coach": 3}, "streak": 0})
    user.update(data)
    users[user_id] = user
    save_users(users)
    return jsonify(user)
