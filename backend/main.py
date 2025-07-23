from flask import Flask
from routes.chat import chat_route
from routes.user import user_route
from flask_cors import CORS
from routes.auth import auth_route


app = Flask(__name__)
CORS(app)

app.register_blueprint(chat_route)
app.register_blueprint(user_route)
app.register_blueprint(auth_route)

if __name__ == "__main__":
    app.run(debug=True)
