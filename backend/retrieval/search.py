import openai
import numpy as np
import os
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

def load_retrieval_data(filename="retrieval_data.json"):
    path = os.path.join(os.path.dirname(__file__), "data", filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_query_embedding(query):
    response = openai.Embedding.create(
        input=[query],
        model="text-embedding-3-small"
    )
    return np.array(response['data'][0]['embedding'])

def search(query, top_k=3):
    data = load_retrieval_data()
    query_emb = get_query_embedding(query)

    similarities = []
    for item in data:
        emb = np.array(item['embedding'])
        sim = cosine_similarity(query_emb, emb)
        similarities.append((sim, item['text']))

    similarities.sort(reverse=True, key=lambda x: x[0])
    return [text for _, text in similarities[:top_k]]

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
