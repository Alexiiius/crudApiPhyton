from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True, resources={r"*": {"origins": "*"}})
db_config = {
    'host': 'db',
    'user': 'root',
    'password': 'rootpassword',
    'database': 'mydb'
}

# Crear la tabla si no existe
def createTable():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    # Verificar si la tabla personas existe y crearla si no existe
    cursor.execute("SHOW TABLES LIKE 'personas'")
    result = cursor.fetchone()
    if result is None:
        sql = "CREATE TABLE IF NOT EXISTS personas (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, telefono VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)"
        cursor.execute(sql)
    conn.close()


@app.route('/')
def home():
    createTable()
    return 'Servidor Flask funcionando...'

@app.route('/GET', methods=['GET'])
def getPersonas():
    createTable()
    if request.method != 'GET':
        return jsonify({'message': 'Metodo invalido'}), 400

    try:
        conn = mysql.connector.connect(**db_config)
    except mysql.connector.Error as err:
        return jsonify({'message': str(err)}), 500

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM personas")
    personas = cursor.fetchall()

    if personas:
        return jsonify({'message': 'Consulta exitosa', 'data': personas}), 200
    else:
        return jsonify({'message': 'No se encontraron personas'}), 404

@app.route('/POST', methods=['POST'])
def crearPersonas():
    createTable()
    if request.method != 'POST':
        return jsonify({'message': 'Metodo invalido'}), 400

    datos = request.json  # Obtiene los datos enviados en la solicitud POST
    if not datos:
        return jsonify({'message': 'La peticion debe ser JSON'}), 400

    nombre = datos.get('nombre')
    apellido = datos.get('apellido')
    telefono = datos.get('telefono')
    email = datos.get('email')

    if not all([nombre, apellido, telefono, email]):
        return jsonify({'message': 'Faltan datos por enviar'}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        consulta = "INSERT INTO personas (nombre, apellido, telefono, email) VALUES (%s, %s, %s, %s)"
        cursor.execute(consulta, (nombre, apellido, telefono, email))
        conn.commit()  # Es importante hacer commit de la transacción
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error en el registro', 'error': str(err)}), 500

    return jsonify({"success": True, "mensaje": "Registro exitoso"}), 201

@app.route('/DELETE/<int:id>', methods=['DELETE'])
def borrarPersonas(id):
    createTable()
    if request.method != 'DELETE':
        return jsonify({'message': 'Metodo invalido'}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        consulta = "DELETE FROM personas WHERE id = %s"
        cursor.execute(consulta, (id,))
        conn.commit()
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error en la eliminacion', 'error': str(err)}), 500

    if cursor.rowcount == 0:
        return jsonify({'message': 'No se encontró la persona para eliminar'}), 404

    return jsonify({"success": True, "mensaje": "Eliminacion exitosa"}), 200

@app.route('/PUT', methods=['PUT'])
def actualizarPersonas():
    createTable()
    if request.method != 'PUT':
        return jsonify({'message': 'Metodo invalido'}), 400

    datos = request.json  # Obtiene los datos enviados en la solicitud PUT
    if not datos:
        return jsonify({'message': 'La peticion debe ser JSON'}), 400

    id = datos.get('id')
    nombre = datos.get('nombre')
    apellido = datos.get('apellido')
    telefono = datos.get('telefono')
    email = datos.get('email')

    if not all([id, nombre, apellido, telefono, email]):
        return jsonify({'message': 'Faltan datos por enviar'}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        consulta = "UPDATE personas SET nombre = %s, apellido = %s, telefono = %s, email = %s WHERE id = %s"
        cursor.execute(consulta, (nombre, apellido, telefono, email, id))
        conn.commit()
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error en la actualizacion', 'error': str(err)}), 500

    if cursor.rowcount == 0:
        return jsonify({'message': 'No se encontró la persona para actualizar'}), 404

    return jsonify({"success": True, "mensaje": "Actualizacion exitosa"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
