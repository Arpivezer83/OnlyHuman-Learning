import json
import os

THREAD_FILE = os.path.join(os.path.dirname(__file__), "threads.json")

# Ellenőrizzük, hogy a mappa létezik-e
os.makedirs(os.path.dirname(THREAD_FILE), exist_ok=True)

def load_threads():
    if os.path.exists(THREAD_FILE):
        with open(THREAD_FILE, "r") as f:
            return json.load(f)
    else:
        return {}

def save_threads(data):
    with open(THREAD_FILE, "w") as f:
        json.dump(data, f)

def get_thread(user_id):
    threads = load_threads()
    return threads.get(user_id)

def create_thread(user_id, thread_id):
    threads = load_threads()
    threads[user_id] = thread_id
    save_threads(threads)
