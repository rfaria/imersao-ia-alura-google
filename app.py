from flask import Flask, render_template
import os
from dotenv import load_dotenv

app = Flask(__name__, template_folder='.')

# Load environment variables from .env file
load_dotenv()

@app.route('/')
def index():
    google_ai_api_key = os.getenv("GOOGLE_API_KEY")
    return render_template('index.html', google_ai_api_key=google_ai_api_key)

if __name__ == '__main__':
    app.run(debug=True)
