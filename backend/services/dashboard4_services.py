from services.loader import load_output
from services.loader import load_input
import pandas as pd

def time_to_seconds(t):
        
        h, m, s = map(int, t.split(":"))
        return h*3600 + m*60 + s

def get_output_distribution():

    df = load_output()

    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

    result = (
    df.groupby("output_type")
    .agg(created_count=("created_count", "sum"),
         uploaded_count=("uploaded_count", "sum"),
         published_count=("published_count", "sum")).reset_index()
)
    return result.to_dict(orient="records")

def get_output_mix():
    df = load_output()

    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

    result = (
        df.groupby("output_type")
        .agg(
            created_count=("created_count", "sum"),
            published_count=("published_count", "sum")
        )
        .reset_index()
    )
    return result.to_dict(orient="records")
def get_output_trend():

    df = load_output()

    

    df = df.rename(columns={
    'Uploaded Duration (hh:mm:ss)': 'uploaded_duration',
    'Created Duration (hh:mm:ss)': 'created_duration',
    'Published Duration (hh:mm:ss)': 'published_duration'
    })

    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

    df["created_duration"] = df["created_duration"].apply(time_to_seconds)
    df["published_duration"] = df["published_duration"].apply(time_to_seconds)
    result = (
        df.groupby("output_type")
        .agg(
        created_count=("created_count", "sum"),
        published_count=("published_count", "sum"),
        created_duration=("created_duration", "sum"),
        published_duration=("published_duration", "sum")
    )
    .reset_index()
)
    
    return result.to_dict(orient="records")

def get_input_type_data():
    df = load_input()

    df = df.rename(columns={
        'Uploaded Duration (hh:mm:ss)': 'uploaded_duration',
        'Created Duration (hh:mm:ss)': 'created_duration',
        'Published Duration (hh:mm:ss)': 'published_duration'
    })


    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

    df["created_duration"] = df["created_duration"].apply(time_to_seconds)
    df["published_duration"] = df["published_duration"].apply(time_to_seconds)

    result = (
        df.groupby("input_type")
        .agg(
            created_count=("created_count", "sum"),
            published_count=("published_count", "sum"),
            created_duration=("created_duration", "sum"),
        published_duration=("published_duration", "sum")
        )
        .reset_index()
    )
    return result.to_dict(orient="records")