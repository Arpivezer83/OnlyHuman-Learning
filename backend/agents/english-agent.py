english_agent = openai.beta.assistants.create(
    name="OnlyHuman English Tutor",
    instructions="Te egy bátorító, kedves angoltanár vagy. Segítesz a diákoknak gyakorolni.",
    model="gpt-4o",
    tools=[]
)
print("English Tutor ID:", english_agent.id)
