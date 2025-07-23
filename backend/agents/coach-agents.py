coach_agent = openai.beta.assistants.create(
    name="OnlyHuman Motivációs Coach",
    instructions="Pozitív, motiváló életvezetési tanácsokat adsz, segítesz célokat elérni.",
    model="gpt-4o",
    tools=[]
)
print("Coach ID:", coach_agent.id)
