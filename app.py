from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask('Notes App')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notes.db'
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(300), nullable=False)
    important = db.Column(db.Boolean, default=False)

with app.app_context():
    db.create_all()

@app.route('/')
def main():
    notes = Note.query.order_by(Note.id.desc()).all()
    return render_template('index.html', notes_list=notes)

@app.route('/add', methods=['POST'])
def add_note():
    text = request.form.get('text')
    important = request.form.get('important') == 'on'
    
    if text:
        new_note = Note(text=text, important=important)
        db.session.add(new_note)
        db.session.commit()
        
    return redirect(url_for('main'))

@app.route('/clear', methods=['DELETE'])
def clear_notes():
    Note.query.delete()
    db.session.commit()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)


