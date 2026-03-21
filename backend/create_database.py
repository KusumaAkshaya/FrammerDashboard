import pandas as pd
import sqlite3
import os

# Database path
DB_PATH = "data/sqlite_db_new.db"

# CSV files mapping to table names
csv_files = {
    "channel_wise_publishing_1": "data/channel-wise-publishing.csv",
    "combined_data2025_3_1_2026_2_28_by_user_1_clean": "data/combined_data(2025-3-1-2026-2-28) by user.csv",
    "combined_data2025_3_1_2026_2_28_by_input_type_1_clean": "data/combined_data(2025-3-1-2026-2-28) by input type.csv",
    "combined_data2025_3_1_2026_2_28_by_channel_and_user_1_clean": "data/combined_data(2025-3-1-2026-2-28) by channel and user.csv",
    "channel_wise_publishing_duration": "data/channel-wise-publishing duration.csv",
    "client_1_combined_data2025_3_1_2026_2_28_1_clean": "data/CLIENT 1 combined_data(2025-3-1-2026-2-28).csv",
    "month_wise_duration_1_clean": "data/month-wise-duration.csv",
    "combined_data2025_3_1_2026_2_28_by_output_type_1_clean": "data/combined_data(2025-3-1-2026-2-28) by output type.csv",
    "combined_data2025_3_1_2026_2_28_by_language_2_clean": "data/combined_data(2025-3-1-2026-2-28) by language.csv",
    "monthly_chart_1": "data/monthly-chart.csv"
}

def create_database():
    # Remove existing database if it exists
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)

    for table_name, csv_path in csv_files.items():
        if os.path.exists(csv_path):
            print(f"Importing {csv_path} into table {table_name}")
            try:
                df = pd.read_csv(csv_path)
                df.to_sql(table_name, conn, if_exists='replace', index=False)
                print(f"✅ Successfully imported {len(df)} rows into {table_name}")
            except Exception as e:
                print(f"❌ Error importing {csv_path}: {e}")
        else:
            print(f"⚠️  CSV file not found: {csv_path}")

    conn.close()
    print(f"\n✅ Database created at {DB_PATH}")

if __name__ == "__main__":
    create_database()