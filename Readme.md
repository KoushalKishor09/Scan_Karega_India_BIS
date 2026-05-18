# Scan Karega India (SKI)

Scan Karega India is a local full-stack prototype for packaged food label analysis. The app lets a user upload a food label image, sends it to a FastAPI backend, extracts product and nutrition details with Gemini Vision, and returns a simple health score with reasons.

Tagline: Scan Karega India, Healthy Banega India.

## Current Features

- Food label image upload from the browser
- Drag-and-drop or file picker support for JPEG, PNG, WebP, and GIF images
- Gemini Vision extraction for product name, brand, ingredients, nutrition values, allergens, additives, and notes
- Health score calculation from sugar, sodium, saturated fat, fiber, and NOVA processing level
- React results view with score badge, nutrition table, ingredients, allergens, additives, and extraction confidence
- FastAPI docs available at `/docs`
- Demo product endpoint and barcode-scan status scaffold

## Tech Stack

### Frontend

- React 18
- Vite
- Plain CSS
- Browser `fetch` API

### Backend

- FastAPI
- Uvicorn
- Pydantic
- HTTPX
- python-multipart
- Gemini API for vision-based label extraction

## Project Structure

```text
.
|-- Readme.md
|-- package.json
|-- scripts/
|   `-- dev.sh
`-- ski-project/
    |-- backend/
    |   |-- .env.example
    |   |-- requirements.txt
    |   `-- app/
    |       |-- main.py
    |       |-- core/
    |       |   `-- config.py
    |       |-- models/
    |       |   `-- product.py
    |       |-- routes/
    |       |   |-- health_score.py
    |       |   |-- image_scan.py
    |       |   |-- products.py
    |       |   `-- scan.py
    |       `-- services/
    |           `-- health_score.py
    `-- frontend/
        |-- .env.example
        |-- package.json
        |-- vite.config.js
        `-- src/
            |-- App.jsx
            |-- main.jsx
            |-- styles.css
            `-- components/
                `-- ImageUpload/
                    `-- ImageUpload.jsx
```

## Prerequisites

- Node.js and npm
- Python 3.10+
- A Gemini API key

## Environment Setup

Create the backend environment file:

```bash
cd ski-project/backend
cp .env.example .env
```

Set your Gemini key in `ski-project/backend/.env`:

```env
GEMINI_API_KEY=your-google-gemini-api-key-here
ALLOWED_ORIGINS=["http://localhost:5173","http://localhost:3000"]
```

Create the frontend environment file:

```bash
cd ../frontend
cp .env.example .env
```

The default frontend API URL is:

```env
VITE_API_URL=http://localhost:8000
```

## Install Dependencies

Install backend dependencies:

```bash
cd ski-project/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run Locally

From the repository root, start both the backend and frontend:

```bash
npm run dev
```

This runs:

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`
- API docs: `http://localhost:8000/docs`

You can also run each service manually.

Backend:

```bash
cd ski-project/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

Frontend:

```bash
cd ski-project/frontend
npm run dev
```

## API Endpoints

### Root

```http
GET /
```

Returns a basic API status message.

### Scan

```http
GET /api/scan/
```

Returns the current barcode scan scaffold status.

### Products

```http
GET /api/products/
```

Returns a demo product.

### Health Score

```http
POST /api/health-score/
```

Scores a product payload.

Example request body:

```json
{
  "barcode": "demo-001",
  "name": "Demo Muesli",
  "brand": "SKI",
  "ingredients": "Oats, nuts, seeds, dried fruit",
  "nutriscore": "b",
  "nova_group": 3,
  "nutrition": {
    "energy_kcal": 372,
    "fat": 8.4,
    "saturated_fat": 1.2,
    "sugars": 7.1,
    "sodium": 0.08,
    "fiber": 8.6,
    "proteins": 10.2
  }
}
```

### Image Scan

```http
POST /api/image-scan/
```

Accepts a multipart upload with a `file` field. The backend sends the image to Gemini Vision, normalizes extracted nutrition fields, calculates a health score, and returns the product analysis.

Supported file types:

- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`

Maximum file size: 10 MB.

## Health Score Logic

The health score starts at 100 and adjusts based on available nutrition data:

- Sugar over 12g per 100g subtracts 25 points
- Sodium over 600mg per 100g subtracts 20 points
- Saturated fat over 5g per 100g subtracts 15 points
- NOVA group 4 subtracts 20 points
- Fiber of at least 3g per 100g adds 5 points

Score labels:

- `75-100`: Healthy
- `50-74`: Moderate
- `0-49`: Needs Caution

## Useful Scripts

From the repository root:

```bash
npm run dev
```

Starts both services.

```bash
npm run verify:env
```

Checks whether the backend can load `GEMINI_API_KEY` and `ALLOWED_ORIGINS`.

From `ski-project/frontend`:

```bash
npm run build
```

Builds the frontend for production.

## Notes

- This project currently uses Gemini for image extraction. It does not include a database, authentication, user history, admin dashboard, or production deployment configuration yet.
- The barcode scan endpoint is scaffolded and currently returns a readiness message.
- Nutrition values are expected to be normalized per 100g or 100ml by the image extraction prompt.

## Team

Team Name: Kranti  
Team Leader: Koushal Kishor Vishwakarma

## License

MIT License
