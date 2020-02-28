import os
import psycopg2
import psycopg2.extras


DATABASE_URL = os.environ['DATABASE_URL']       #heroku


def get_connection_string():
    user_name = os.environ.get('PSQL_USER_NAME')
    password = os.environ.get('PSQL_PASSWORD')
    host = os.environ.get('PSQL_HOST')
    database_name = os.environ.get('PSQL_DB_NAME')

    env_variables_defined = user_name and password and host and database_name

    # sometimes this fails first try even with the correct information in PyCharm

    if env_variables_defined:
        string_is = f"postgresql://{user_name}:{password}@{host}/{database_name}"
        return string_is #f'postgresql://{user_name}:{password}@{host}/{database_name}'#.format(
            # user_name=user_name,
            # password=password,
            # host=host,
            # database_name=database_name
        # )
    else:
        raise KeyError('Some necessary environment variable(s) are not defined')


def open_database():
    try:
        # lines commented out because of different heroku deployment settings
        # connection_string = get_connection_string()
        # connection = psycopg2.connect(connection_string)

        connection = psycopg2.connect(DATABASE_URL, sslmode='require')    # heroku
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print('Database connection problem')
        raise exception
    return connection


def connection_handler(function):
    def wrapper(*args, **kwargs):
        connection = open_database()
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = function(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value
    return wrapper

