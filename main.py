from flask import Flask, json, jsonify, render_template, request

app = Flask('app')


@app.route('/')
def index_lapa():
  return render_template('chat.html')

@app.route('/chat/read')
def ielasit_chatu():
  chata_rindas = []
  with open("chat.txt", "r", encoding="UTF-8") as f:
    for rinda in f:
      chata_rindas.append(rinda)
  return jsonify({"chat": chata_rindas})

@app.route('/chats/send', methods=['POST'])
def suutiit_zinju():
  dati = request.json
  
  with open("chat.txt", "a", newline="", encoding="UTF-8") as f:
    f.write(dati["chat"] + "\n")

  return ielasit_chatu()
  
if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
