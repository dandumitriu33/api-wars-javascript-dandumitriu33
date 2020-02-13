import connection


@connection.connection_handler
def get_everything(cursor):
    cursor.execute(f"""
        SELECT * FROM users;
""")
    users = cursor.fetchall()
    return users
