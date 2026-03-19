import pandas as pd

def load_video_details():
    return pd.read_csv("data/video_list_data_obfuscated copy.csv")


def load_monthly_chart():
    return pd.read_csv("data/monthly-chart.csv")


def load_clients():
    return pd.read_csv("data/CLIENT 1 combined_data(2025-3-1-2026-2-28).csv")


def load_channel_duration():
    return pd.read_csv("data/channel-wise-publishing duration.csv")


def load_channel_publish():
    return pd.read_csv("data/channel-wise-publishing.csv")

def load_monthly_duration():
    return pd.read_csv("data/month-wise-duration.csv")

def load_users():
    return pd.read_csv("data/combined_data(2025-3-1-2026-2-28) by channel and user.csv")

def load_input():
    return pd.read_csv('data\combined_data(2025-3-1-2026-2-28) by input type.csv')

def load_output():
    return pd.read_csv('data\combined_data(2025-3-1-2026-2-28) by output type.csv')

