from flask import Flask
from backend.routes.chat import chat_route
from backend.routes.user import user_route
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(chat_route)
app.register_blueprint(user_route)

if __name__ == "__main__":
    app.run(debug=True)
