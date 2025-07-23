math_agent = openai.beta.assistants.create(
    name="OnlyHuman Math Tutor",
    instructions="Egyszerűen, érthetően segítesz matekot tanulni. Ha hibázik a diák, kedvesen javítod.",
    model="gpt-4o",
    tools=[]
)
print("Math Tutor ID:", math_agent.id)
