from flask import Flask, jsonify, request
import os
from flask_cors import CORS
import firebase_admin
from firebase_admin import  firestore

app = Flask(__name__)
CORS(app)



# firebase_credential_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
# cred = credentials.Certificate(firebase_credential_path)
# firebase_admin.initialize_app(cred)

firebase_admin.initialize_app()
db = firestore.client()
# db = firestore.client()

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    task_ref=db.collection("tasks").add(data)
    return jsonify({"message":"task added", "id":task_ref[1].id})


@app.route("/tasks", methods=["GET"])
def get_alltask():
    tasks=[]
    for doc in db.collection("tasks").stream():
        tasks.append({"id":doc.id, **doc.to_dict()})
    return jsonify(tasks)

@app.route("/tasks/<tasks_id>", methods=["PUT"])
def update_task(tasks_id):
    data=request.get_json()
    db.collection("tasks").document(tasks_id).update(data)
    return jsonify({"message":"Task updated"})

@app.route("/tasks/<tasks_id>", methods=["DELETE"])
def delete_task(tasks_id):
    db.collection("tasks").document(tasks_id).delete()
    return jsonify({"message":"task was deleted"})


if __name__ == "__main__":
    app.run(debug=True)
