from flask import Blueprint, request, jsonify
import openai
import os

notebook_route = Blueprint("notebook", __name__)
openai.api_key = os.getenv("OPENAI_API_KEY")  # vagy ideiglenesen: openai.api_key = "sk-..."

@notebook_route.route("/api/notebook-task", methods=["GET"])
def generate_notebook_task():
    prompt = "Adj egy egyszerű, kreatív angol nyelvtanulási feladatot, amely fejleszti a szókincset vagy a mondatalkotást. Csak a feladatot add vissza!"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}],
        max_tokens=100
    )
    task = response.choices[0].message.content.strip()
    return jsonify({"task": task})


@notebook_route.route("/api/notebook-feedback", methods=["POST"])
def notebook_feedback():
    data = request.get_json()
    task = data.get("task", "")
    answer = data.get("answer", "")
    if not task or not answer:
        return jsonify({"error": "Hiányzik a feladat vagy válasz"}), 400

    full_prompt = f"A feladat: \"{task}\"\nA tanuló válasza: \"{answer}\"\nAdj részletes, barátságos visszajelzést és javítást, ha szükséges!"

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": full_prompt}],
        max_tokens=300
    )
    feedback = response.choices[0].message.content.strip()
    return jsonify({"feedback": feedback})
