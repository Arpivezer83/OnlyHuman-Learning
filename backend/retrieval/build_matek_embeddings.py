from loader import load_pptx, split_text
from embedder import get_embeddings
import json
import os

def save_embeddings(embeddings, chunks, output_file):
    """
    Elmenti az embeddingeket és a hozzájuk tartozó szövegeket JSON-be.
    """
    data = [
        {"text": chunk, "embedding": emb}
        for chunk, emb in zip(chunks, embeddings)
    ]

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("PPTX betöltése...")
    text = load_pptx("data/felvianyag.pptx")
    
    print("Szöveg darabolása...")
    chunks = split_text(text)

    print("Embedding generálás...")
    embeddings = get_embeddings(chunks)

    output_path = os.path.join(os.path.dirname(__file__), "matek_embeddings.json")
    
    print(f"Mentés: {output_path}")
    save_embeddings(embeddings, chunks, output_path)

    print("Kész!")
