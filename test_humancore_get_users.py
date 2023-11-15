import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the bearer token from the environment variable
bearer_token = os.getenv('HUMANCORE_BEARER_TOKEN')

# Define the endpoint URL
url = 'https://microservice-b2b-dev.uc.r.appspot.com/api/v1/user'

# Make the HTTP GET request
response = requests.get(url, headers={'Authorization': f'Bearer {bearer_token}'})

# Print the response
print(response.status_code)

if response.status_code == 200:
    print(response.json())