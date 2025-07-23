from openai import OpenAI

client = OpenAI()

def get_embeddings(chunks, model="text-embedding-3-small"):
    """
    Létrehozza az embeddingeket a szöveg darabokból.
    """
    response = client.embeddings.create(
        model=model,
        input=chunks
    )

    embeddings = [item.embedding for item in response.data]
    return embeddings
