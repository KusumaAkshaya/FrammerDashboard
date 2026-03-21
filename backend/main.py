from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.dashboard_routes import router as dashboard_router
from routes.dashboard3_routes import router as dashboard3_router
from routes.dashboard2_routes import router2 as dashboard2_router
from routes.dashboard4_routes import router4 as dashboard4_router
from routes.usage_routes import router as usage_router  
from routes.chat_routes import router as chat_router
app = FastAPI()

import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

# ✅ ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
       "http://localhost:3000",
       "https://frammer-dashboard-3apj.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# optional root
@app.get("/")
def home():
    return {"message": "Backend running"}

# routers
app.include_router(dashboard_router, prefix="/api")
app.include_router(dashboard3_router, prefix="/api")
app.include_router(dashboard2_router, prefix="/api")
app.include_router(dashboard4_router, prefix="/api")
app.include_router(usage_router, prefix="/api")  
app.include_router(chat_router, prefix="/chat")
