from flask import Flask, render_template, request, session, url_for, redirect
from flask import jsonify
import data_manager
import util
import requests

app = Flask(__name__)


app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/users')
def get_users():
    users = data_manager.get_everything()
    # return render_template('users.html', users=users)
    return jsonify(users)


@app.route('/register', methods=['GET', 'POST'])
def register_page():
    return render_template('register.html')


@app.route('/registration_form', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        input_username = request.form['username']
        input_password = request.form['password']
        input_password_confirmation = request.form.get('password_confirmation')
        if input_password == input_password_confirmation:
            hashed_password = util.hash_password(input_password)
            try:
                data_manager.add_user_into_db(input_username, hashed_password)
            except:
                message_failed = "Sorry, that username already exists."
                return render_template('register.html', message_failed=message_failed)
            return redirect(url_for('login'))
        else:
            message_password_confirmation_failed = "Password confirmation unsuccessful. Please try again."
            return render_template('register.html',
                                   message_password_confirmation_failed=message_password_confirmation_failed)
    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        message_login_failed = "Username or password invalid."
        try:
            hashed_password = data_manager.get_password_by_username(request.form['username'])
            if data_manager.verify_password(request.form['password'], hashed_password):
                session['username'] = request.form['username']
                return redirect(url_for('home'))
            else:
                return render_template('login.html', message_login_failed=message_login_failed)
        except:
            return render_template('login.html', message_login_failed=message_login_failed)
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


@app.route('/api/vote', methods=['POST'])
def vote():
    username = request.json['voteUsername']
    planet_name = request.json['votePlanetName']
    user_id = data_manager.get_user_id_by_username(username)
    print('planet no exist db response ', data_manager.get_planet_id_by_planet_name(planet_name))
    if data_manager.get_planet_id_by_planet_name(planet_name) != 'empty':
        planet_id = data_manager.get_planet_id_by_planet_name(planet_name)
        print('planet id resulted lol ', planet_id)
        data_manager.add_vote_for_planet(user_id, planet_name, planet_id)
    elif data_manager.get_planet_id_by_planet_name(planet_name) == 'empty':
        print('planet id was not existent ')
        data_manager.add_vote_for_new_planet(user_id, planet_name)


@app.route('/votes')
def votes():
    votes = data_manager.get_all_votes()
    return jsonify(votes)


if __name__ == "__main__":
    app.run(debug=True)
