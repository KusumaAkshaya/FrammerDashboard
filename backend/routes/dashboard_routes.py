from fastapi import APIRouter
from services.dashboard_service import (
    get_kpis,
    monthly_trend,
    monthly_duration_trend,
    platform_distribution,
    channel_contribution,
    alerts
)

router = APIRouter(prefix="/dashboard")


@router.get("/kpi")
def kpi():
    return get_kpis()


@router.get("/monthly-trend")
def trend():
    return monthly_trend()


@router.get("/monthly-duration-trend")
def duration_trend():
    return monthly_duration_trend()



@router.get("/platforms")
def platforms():
    return platform_distribution()


@router.get("/channels")
def channels(platform: str):
    return channel_contribution(platform)


@router.get("/alerts")
def get_alerts():
    return alerts()

