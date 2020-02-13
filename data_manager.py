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
