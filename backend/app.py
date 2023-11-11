from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bcrypt
import jwt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from pymongo import message

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app)

mongo_uri = f"mongodb://localhost:27017/e-commerce"
app.config['MONGO_URI'] = mongo_uri

mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-secrete-key'


@app.route('/')
def hello():
    return 'hello world123123'


@app.route('/adminRegister', methods=['POST'])
def adminRegister():
    allusers = mongo.db.admins
    user = allusers.find_one({'Email': request.json['Email']})
    name = allusers.find_one({'Name': request.json['Name']})
    phone = allusers.find_one({'Phone': request.json['Phone']})

    if user:
        return jsonify(message='Email already exixts'), 401
    
    if name:
        return jsonify(message='Name already exixts'), 401
    
    if phone:
        return jsonify(message='Phone already exixts'), 401
    
    if request.json['Password'] != request.json['CPassword']:
        return jsonify(message='Password not matching'), 401

    hashpw = bcrypt.hashpw(
        request.json['Password'].encode('utf-8'), bcrypt.gensalt()
    )
    hashcpw = bcrypt.hashpw(
        request.json['CPassword'].encode('utf-8'), bcrypt.gensalt()
    )

    access_token = create_access_token(identity=request.json['Email'])

    allusers.insert({
        'Email': request.json['Email'],
        'Name': request.json['Name'],
        'Phone': request.json['Phone'],
        'Password': hashpw,
        'CPassword': hashcpw,
        'tokens': [
            {
                'token': str(access_token)
            }
        ]
    })

    return jsonify(token=str(access_token)), 201


@app.route('/adminLogin', methods=['POST'])
def adminLogin():
    allusers = mongo.db.admins

    user = allusers.find_one({'Email': request.json['Email']})

    if user:
        if bcrypt.hashpw(request.json['Password'].encode('utf-8'), user['Password']) == user['Password']:
            access_token = create_access_token(identity=request.json['Email'])
            user['tokens'].append({'token': str(access_token)})
            allusers.save(user)
            return jsonify(token=str(access_token)), 201
    return jsonify(message="Invalid UserID or Password"), 401


@app.route('/logoutAdmin', methods=['POST'])
def logoutAdmin():
    allusers = mongo.db.admins
    user = allusers.find_one({'tokens.token': request.json['auth']})

    if user:
        user['tokens'] = []
        allusers.save(user)
        return jsonify(message="Logout Successfully"), 201
    return jsonify(message="Logout Failed"), 401


if __name__ == '__main__':
    app.run(debug=True)
