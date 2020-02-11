from flask import Flask, render_template
import requests

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


    # response = requests.get('https://swapi.co/api/planets/').json()
    # planets_list = []
    # for planet in response['results']:
    #     planets_list.append(planet['name'])
    # print(planets_list)




if __name__ == "__main__":
    app.run(debug=True)
