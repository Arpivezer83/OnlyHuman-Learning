import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import openai

class MatekRetriever:
    def __init__(self, embedding_path):
        with open(embedding_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        self.texts = [item["text"] for item in data]
        self.embeddings = np.array([item["embedding"] for item in data])

    def get_query_embedding(self, query):
        response = openai.Embedding.create(
            input=query,
            model="text-embedding-3-small"
        )
        return np.array(response['data'][0]['embedding']).reshape(1, -1)

    def search(self, query, top_k=3):
        query_emb = self.get_query_embedding(query)
        sims = cosine_similarity(query_emb, self.embeddings)
        top_indices = sims[0].argsort()[-top_k:][::-1]
        return [self.texts[i] for i in top_indices]
