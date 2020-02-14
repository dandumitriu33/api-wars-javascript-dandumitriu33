import connection_to_db
import bcrypt


@connection_to_db.connection_handler
def get_everything(cursor):
    cursor.execute(f"""
        SELECT * FROM users;
""")
    users = cursor.fetchall()
    return users


@connection_to_db.connection_handler
def add_user_into_db(cursor, input_username, hashed_password):
    cursor.execute(f"""
        INSERT INTO users (username, password) VALUES ('{input_username}', '{hashed_password}'); 
""")


@connection_to_db.connection_handler
def get_password_by_username(cursor, username):
    cursor.execute(f"""
        SELECT password FROM users WHERE username='{username}';
""")
    result = cursor.fetchone()
    password = result['password']
    return password


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@connection_to_db.connection_handler
def add_vote_for_planet(cursor, user_id, planet_name, planet_id):
    cursor.execute(f"""
        INSERT INTO planet_votes (user_id, planet_name, planet_id) VALUES ({user_id}, '{planet_name}', {planet_id});
""")


@connection_to_db.connection_handler
def add_vote_for_new_planet(cursor, user_id, planet_name):
    cursor.execute(f"""
        INSERT INTO planet_votes (user_id, planet_name) VALUES ({user_id}, '{planet_name}');
""")


@connection_to_db.connection_handler
def get_user_id_by_username(cursor, username):
    cursor.execute(f"""
        SELECT id FROM users WHERE username = '{username}';
""")
    result = cursor.fetchone()
    user_id = result['id']
    return user_id


@connection_to_db.connection_handler
def get_planet_id_by_planet_name(cursor, planet_name):
    try:
        cursor.execute(f"""
            SELECT planet_id FROM planet_votes WHERE planet_name = '{planet_name}';
    """)
        result = cursor.fetchone()
        planet_id = result['planet_id']
        return planet_id
    except:
        return 'empty'
