from flask import Blueprint, request, jsonify
import openai
import json
import os
import time
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from threads.thread_manager import get_thread, create_thread
from routes.user import load_users, save_users

chat_route = Blueprint('chat', __name__)

# Agent ID-k betöltése
agent_path = os.path.join(os.path.dirname(__file__), '..', 'agents', 'agent_ids.json')
agent_path = os.path.abspath(agent_path)

with open(agent_path, "r") as f:
    agents = json.load(f)

agent_key_map = {
    "english": "english_agent_id",
    "math": "math_agent_id",
    "coach": "coach_agent_id"
}

# Matek retriever betöltése
embedding_path = os.path.join(os.path.dirname(__file__), '..', 'retrieval', 'data', 'matek_embeddings.json')
embedding_path = os.path.abspath(embedding_path)

with open(embedding_path, "r", encoding="utf-8") as f:
    data = json.load(f)

matek_texts = [item["text"] for item in data]
matek_embeddings = np.array([item["embedding"] for item in data])

def get_query_embedding(query):
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=[query]
    )
    return np.array(response.data[0].embedding)

def search_matek(query, top_k=3):
    query_emb = get_query_embedding(query).reshape(1, -1)
    sims = cosine_similarity(query_emb, matek_embeddings)
    top_indices = sims[0].argsort()[-top_k:][::-1]
    return [matek_texts[i] for i in top_indices]

@chat_route.route("/chat", methods=["POST"])
def chat():
    if not request.is_json:
        print("❌ Hibás Content-Type, nem JSON")  # LOG
        return jsonify({"error": "Hiányzó vagy hibás JSON kérés"}), 400

    data = request.get_json()
    print("📩 Kapott adatok:", data)  # LOG

    user_id = data.get("user_id")
    agent_type = data.get("agent_type")
    user_message = data.get("user_message")

    if not user_id or not agent_type or not user_message:
        print("❌ Hiányzó mező(ke):", {
            "user_id": user_id,
            "agent_type": agent_type,
            "user_message": user_message
        })  # LOG
        return jsonify({"error": "Hiányzó mezők a kérésben"}), 400

    agent_key = agent_key_map.get(agent_type)
    if not agent_key:
        print(f"❌ Ismeretlen agent típus: {agent_type}")
        return jsonify({"error": "Ismeretlen agent típus"}), 400

    assistant_id = agents[agent_key]

    # XP növelés és profil mentés
    users = load_users()
    user = users.get(user_id, {"xp": 0, "goals": {"english": 5, "math": 5, "coach": 3}, "streak": 0})
    user["xp"] = user.get("xp", 0) + 1
    users[user_id] = user
    save_users(users)

    # Thread kezelés
    thread_id = get_thread(user_id)
    if thread_id is None:
        thread = openai.beta.threads.create()
        thread_id = thread.id
        create_thread(user_id, thread_id)

    # Felhasználói üzenet összeállítása
    if agent_type == "math":
        relevant_chunks = search_matek(user_message)
        context_text = "\n".join(relevant_chunks)

        message_content = (
            "Te egy OnlyHuman AI Tutor vagy, aki középiskolai matek felvételire segít készülni.\n"
            "A következő szöveg a tananyagból származik, használd bátran a válaszban:\n\n"
            f"{context_text}\n\n"
            "Kérdés:\n"
            f"{user_message}"
        )
    else:
        message_content = user_message

    try:
        openai.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_content
        )

        run = openai.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=assistant_id
        )

        # Várakozás a válaszra
        while True:
            run_status = openai.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
            if run_status.status == "completed":
                messages = openai.beta.threads.messages.list(thread_id=thread_id)
                response = messages.data[0].content[0].text.value
                return jsonify({"response": response})
            elif run_status.status == "failed":
                print("❌ Assistant válasz futás közben elbukott.")
                return jsonify({"error": "Run failed"}), 500
            else:
                time.sleep(1)
    except Exception as e:
        print(f"❌ Váratlan hiba a chat válasz feldolgozásakor: {e}")
        return jsonify({"error": "Belső hiba"}), 500
