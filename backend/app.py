from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Fetch data from third-party API
THIRD_PARTY_API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
data = []

@app.route('/initialize', methods=['GET'])
def initialize_database():
    global data
    response = requests.get(THIRD_PARTY_API_URL)
    data = response.json()
    return jsonify({"message": "Database initialized", "data": data})

@app.route('/transactions', methods=['GET'])
def get_transactions():
    month = request.args.get('month', 'March').lower()
    search = request.args.get('search', '').lower()
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    # Filter transactions by month and search
    filtered_data = [t for t in data if month in t['dateOfSale'].lower()]
    if search:
        filtered_data = [t for t in filtered_data if search in t['title'].lower() or search in t['description'].lower() or search in str(t['price'])]

    # Pagination
    start = (page - 1) * per_page
    end = start + per_page
    paginated_data = filtered_data[start:end]

    return jsonify({
        "page": page,
        "per_page": per_page,
        "total": len(filtered_data),
        "transactions": paginated_data
    })

@app.route('/statistics', methods=['GET'])
def get_statistics():
    month = request.args.get('month', 'March').lower()
    filtered_data = [t for t in data if month in t['dateOfSale'].lower()]
    total_sale = sum(t['price'] for t in filtered_data if t['sold'])
    sold_items = len([t for t in filtered_data if t['sold']])
    not_sold_items = len([t for t in filtered_data if not t['sold']])

    return jsonify({
        "total_sale": total_sale,
        "sold_items": sold_items,
        "not_sold_items": not_sold_items
    })

@app.route('/barchart', methods=['GET'])
def get_barchart():
    month = request.args.get('month', 'March').lower()
    filtered_data = [t for t in data if month in t['dateOfSale'].lower()]
    price_ranges = {
        "0-100": 0,
        "101-200": 0,
        "201-300": 0,
        "301-400": 0,
        "401-500": 0,
        "501-600": 0,
        "601-700": 0,
        "701-800": 0,
        "801-900": 0,
        "901-above": 0
    }

    for t in filtered_data:
        price = t['price']
        if price <= 100:
            price_ranges["0-100"] += 1
        elif price <= 200:
            price_ranges["101-200"] += 1
        elif price <= 300:
            price_ranges["201-300"] += 1
        elif price <= 400:
            price_ranges["301-400"] += 1
        elif price <= 500:
            price_ranges["401-500"] += 1
        elif price <= 600:
            price_ranges["501-600"] += 1
        elif price <= 700:
            price_ranges["601-700"] += 1
        elif price <= 800:
            price_ranges["701-800"] += 1
        elif price <= 900:
            price_ranges["801-900"] += 1
        else:
            price_ranges["901-above"] += 1

    return jsonify(price_ranges)

@app.route('/piechart', methods=['GET'])
def get_piechart():
    month = request.args.get('month', 'March').lower()
    filtered_data = [t for t in data if month in t['dateOfSale'].lower()]
    categories = {}

    for t in filtered_data:
        category = t['category']
        if category in categories:
            categories[category] += 1
        else:
            categories[category] = 1

    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True)