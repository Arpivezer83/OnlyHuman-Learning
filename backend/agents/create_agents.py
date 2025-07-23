import openai
import json
import os
from dotenv import load_dotenv

# Betöltjük a .env fájlt
load_dotenv()

# API kulcs környezeti változóból
openai.api_key = os.getenv("OPENAI_API_KEY")

agents = {}

agents["english_agent_id"] = openai.beta.assistants.create(
    name="OnlyHuman English Tutor",
    instructions="Te egy kedves, bátorító angoltanár vagy. Segítsd a tanulót!",
    model="gpt-3.5-turbo-1106"
).id

agents["math_agent_id"] = openai.beta.assistants.create(
    name="OnlyHuman Math Tutor",
    instructions="Egyszerűen és érthetően magyarázol matekot.",
    model="gpt-4o"
).id

agents["coach_agent_id"] = openai.beta.assistants.create(
    name="OnlyHuman Motivációs Coach",
    instructions="Segítesz célokat kitűzni, motiválsz, bátorítasz.",
    model="gpt-3.5-turbo-1106"
).id

# Mentés
save_path = os.path.join(os.path.dirname(__file__), "agent_ids.json")
with open(save_path, "w") as f:
    json.dump(agents, f)

print("Agent ID-k sikeresen létrehozva és elmentve a backend/agents/agent_ids.json fájlba.")
