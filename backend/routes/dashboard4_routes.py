from fastapi import APIRouter
from services.dashboard4_services import (
    get_input_type_data,
    get_output_distribution,
    get_output_trend,
    get_output_mix
)


router4 = APIRouter(prefix="/output", tags=["dashboard4"])

@router4.get("/distribution")
def output_distribution():
    return  get_output_distribution()

@router4.get("/trend")
def output_trend():
    return get_output_trend()

@router4.get("/mix")
def output_mix():
    return get_output_mix()

@router4.get("/input")
def input_type_data():
    return get_input_type_data()