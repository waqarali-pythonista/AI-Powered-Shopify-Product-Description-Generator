import os
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

api_key = api_key = ''
client = OpenAI(api_key=api_key)
MODEL = "gpt-4o"

def encode_images(image_paths):
    encoded_images = []
    for image_path in image_paths:
        with open(image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
            encoded_images.append(encoded_image)
    return encoded_images

@app.route('/generate-description', methods=['POST'])
def generate_description():
    print(request.headers)  # Debug print statement
    print(request.files)    # Debug print statement

    if 'images' not in request.files:
        return jsonify({'error': 'No images provided'}), 400

    images = request.files.getlist('images')
    image_paths = []

    for image in images:
        print(f"Received image: {image.filename}")  # Debug print statement
        image_path = os.path.join('uploads', image.filename)
        image.save(image_path)
        image_paths.append(image_path)

    encoded_images = encode_images(image_paths)

    # Prepare messages for API request
    messages = [
        {"role": "system", "content": "You are analyzing product images and creating the product description."},
        {"role": "user", "content": [
            {"type": "text", "text": "Create the product description and add features."}
        ]}
    ]

    # Add each encoded image as a separate "image_url" in the messages array
    for encoded_image in encoded_images:
        messages[1]["content"].append({"type": "image_url", "image_url": {"url": f"data:image/png;base64,{encoded_image}"}})

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=0.0,
    )
    print(response.choices[0].message.content)  # Debug print statement
    return jsonify(response.choices[0].message.content)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
