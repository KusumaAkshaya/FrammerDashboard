from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure your folder structure has an __init__.py in the routes folder
from routes.dashboard_routes import router as dashboard_router
from routes.dashboard3_routes import router as dashboard3_router
from routes.dashboard2_routes import router2 as dashboard2_router
from routes.dashboard4_routes import router4 as dashboard4_router
from routes.usage_routes import router as usage_router  

app = FastAPI()

# ✅ Updated CORS for your Netlify Deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://frammerdashboard.netlify.app" # Your production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Frammer Dashboard API is live", "status": "running"}

# ✅ Route registrations
app.include_router(dashboard_router, prefix="/api")
app.include_router(dashboard3_router, prefix="/api")
app.include_router(dashboard2_router, prefix="/api")
app.include_router(dashboard4_router, prefix="/api")
app.include_router(usage_router, prefix="/api")

# Vercel needs the app object to be available at the module level