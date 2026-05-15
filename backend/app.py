from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
db_path = os.path.join(os.path.dirname(__file__), 'incidents.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    incident_type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='Reported') # Reported, In Progress, Resolved
    agency = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.incident_type,
            'location': self.location,
            'description': self.description,
            'status': self.status,
            'agency': self.agency,
            'time': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# Agency Mapping
AGENCY_MAP = {
    'accident': 'Police',
    'obstacle': 'KeNHA',
    'pothole': 'KeNHA',
    'stalled': 'NTSA'
}

@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    incidents = Incident.query.order_by(Incident.created_at.desc()).all()
    return jsonify([i.to_dict() for i in incidents])

@app.route('/api/incidents', methods=['POST'])
def create_incident():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    new_incident = Incident(
        incident_type=data.get('type', 'Unknown'),
        location=data.get('location', ''),
        description=data.get('description', ''),
        agency=AGENCY_MAP.get(data.get('type'), 'Police')
    )
    
    db.session.add(new_incident)
    db.session.commit()
    
    return jsonify(new_incident.to_dict()), 201

@app.route('/api/incidents/<int:incident_id>/status', methods=['PATCH'])
def update_status(incident_id):
    data = request.json
    incident = Incident.query.get_or_404(incident_id)
    
    if 'status' in data:
        incident.status = data['status']
        db.session.commit()
        return jsonify(incident.to_dict())
    
    return jsonify({'error': 'Status not provided'}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
