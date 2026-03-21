# from fastapi import APIRouter, HTTPException
# import sqlite3
# import pandas as pd

# router = APIRouter()

# # =========================
# # CONFIG
# # =========================
# DB_PATH = "sqlite_db_new.db"  # Database file in backend directory

# # =========================
# # HARDCODED FALLBACK SQL
# # =========================
# fixed_fallback_sql_list = [
#     {"question": "Retrieve monthly totals for uploaded, created, and published videos.",
#      "sql": "SELECT Month, Total_Uploaded, Total_Created, Total_Published FROM monthly_chart_1;"},
#     {"question": "Get total published videos per channel.",
#      "sql": "SELECT Channels, Total_Count AS Total_Published FROM channel_wise_publishing_1;"},
#     {"question": "Find total created videos by language.",
#      "sql": "SELECT Language, Created_Count AS Total_Created FROM combined_data2025_3_1_2026_2_28_by_language_2_clean;"},
#     {"question": "Get total uploaded, created, published durations per month.",
#      "sql": "SELECT Month, Total_Uploaded_Duration AS Total_Uploaded, Total_Created_Duration AS Total_Created, Total_Published_Duration AS Total_Published FROM month_wise_duration_1_clean;"},
#     {"question": "Show uploaded, created, published counts per input type.",
#      "sql": "SELECT Input_Type, Uploaded_Count, Created_Count, Published_Count FROM combined_data2025_3_1_2026_2_28_by_input_type_1_clean;"},
#     {"question": "Get total uploaded, created, published counts per channel and user.",
#      "sql": "SELECT Channel, User, Uploaded_Count, Created_Count, Published_Count FROM combined_data2025_3_1_2026_2_28_by_channel_and_user_1_clean;"},
#     {"question": "Retrieve channel-wise publishing durations.",
#      "sql": "SELECT Channels, Facebook_Duration, Instagram_Duration, Reels_Duration, Shorts_Duration, Youtube_Duration, Total_Duration FROM channel_wise_publishing_duration;"},
#     {"question": "Find total uploaded, created, published counts per output type.",
#      "sql": "SELECT Output_Type, Uploaded_Count AS Total_Uploaded, Created_Count AS Total_Created, Published_Count AS Total_Published FROM combined_data2025_3_1_2026_2_28_by_output_type_1_clean;"},
#     {"question": "Get total uploaded, created, published counts per language.",
#      "sql": "SELECT Language, Uploaded_Count, Created_Count, Published_Count FROM combined_data2025_3_1_2026_2_28_by_language_2_clean;"},
#     {"question": "Get published videos per user.",
#      "sql": "SELECT User, Published_Count FROM combined_data2025_3_1_2026_2_28_by_user_1_clean;"},
#     {"question": "Show monthly trends",
#      "sql": "SELECT * FROM monthly_chart_1 ORDER BY Month;"},
#     {"question": "What are the top users by published count",
#      "sql": "SELECT User, Published_Count FROM combined_data2025_3_1_2026_2_28_by_user_1_clean ORDER BY Published_Count DESC LIMIT 10;"},
#     {"question": "Show data by output type",
#      "sql": "SELECT * FROM combined_data2025_3_1_2026_2_28_by_output_type_1_clean;"},
#     {"question": "Get channel performance",
#      "sql": "SELECT * FROM channel_wise_publishing_1;"},
#     {"question": "Show language distribution",
#      "sql": "SELECT * FROM combined_data2025_3_1_2026_2_28_by_language_2_clean;"}
# ]

# # =========================
# # SIMPLE TEXT MATCHING FOR SQL GENERATION
# # =========================
# def get_demo_sql(question):
#     # Try to match question with known queries
#     question_lower = question

#     for entry in fixed_fallback_sql_list:
#         # Simple keyword matching
#         entry_keywords = entry["question"].lower().split()
#         question_keywords = question_lower.split()

#         # Check if most keywords match
#         matches = sum(1 for keyword in entry_keywords if keyword in question_keywords)
#         if matches >= len(entry_keywords) * 0.6:  # 60% match threshold
#             return entry["sql"]

#     # If no match found, try partial matching
#     for entry in fixed_fallback_sql_list:
#         if any(word in question_lower for word in entry["question"].lower().split()[:3]):
#             return entry["sql"]

#     return None

# # =========================
# # RUN SQL QUERY
# # =========================
# def run_sql_query(sql):
#     if not sql.lower().startswith("select"):
#         return "❌ Only SELECT queries allowed!"
#     try:
#         conn = sqlite3.connect(DB_PATH)
#         df = pd.read_sql_query(sql, conn)
#         conn.close()

#         # Convert DataFrame to dict for JSON response
#         result = {
#             "sql": sql,
#             "data": df.to_dict('records'),
#             "columns": list(df.columns),
#             "row_count": len(df)
#         }
#         return result
#     except Exception as e:
#         return f"❌ SQL Error: {str(e)}"

# # =========================
# # CHAT ENDPOINT
# # =========================
# @router.post("/")
# def chat(message: dict):
#     user_message = message.get("message", "").strip()

#     if not user_message:
#         raise HTTPException(status_code=400, detail="Message is required")

#     # Generate SQL
#     sql = get_demo_sql(user_message)

#     if not sql:
#         return {
#             "reply": "❌ Could not generate SQL for this question. Please try rephrasing your question. Try asking about monthly trends, channel performance, user data, or language distribution.",
#             "sql": "",
#             "data": [],
#             "columns": [],
#             "row_count": 0
#         }

#     # Execute query
#     result = run_sql_query(sql)

#     if isinstance(result, str):  # Error occurred
#         return {
#             "reply": result,
#             "sql": sql,
#             "data": [],
#             "columns": [],
#             "row_count": 0
#         }

#     # Format response for frontend
#     data_preview = result["data"][:10] if len(result["data"]) > 10 else result["data"]

#     reply = f"📊 Found {result['row_count']} results:\n\n"
#     reply += f"🧾 SQL: {sql}\n\n"

#     if result["data"]:
#         reply += "📋 Data Preview:\n"
#         for row in data_preview:
#             reply += " | ".join([f"{k}: {v}" for k, v in row.items()]) + "\n"
#         if len(result["data"]) > 10:
#             reply += f"\n... and {len(result['data']) - 10} more rows"
#     else:
#         reply += "No data found."

#     return {
#         "reply": reply,
#         "sql": result["sql"],
#         "data": result["data"],
#         "columns": result["columns"],
#         "row_count": result["row_count"]
#     }




from fastapi import APIRouter, HTTPException
import sqlite3
import pandas as pd

router = APIRouter()

DB_PATH = "sqlite_db_new.db"

# =========================
# CORRECTED SQL MAPPING
# =========================
fixed_fallback_sql_list = [

    {
        "question": "Retrieve monthly totals for uploaded, created, and published videos.",
        "sql": "SELECT Month, \"Total Uploaded\", \"Total Created\", \"Total Published\" FROM monthly_chart_1;"
    },

    {
        "question": "Get total published videos per channel.",
        "sql": "SELECT Channels, \"Total Count\" AS Total_Published FROM channel_wise_publishing_og;"
    },

    {
        "question": "Find total created videos by language.",
        "sql": "SELECT Language, \"Created Count\" AS Total_Created FROM combined_data2025_3_1_2026_2_28_by_language_2;"
    },

    {
        "question": "Get total uploaded, created, published durations per month.",
        "sql": "SELECT Month, \"Total Uploaded Duration\" AS Total_Uploaded, \"Total Created Duration\" AS Total_Created, \"Total Published Duration\" AS Total_Published FROM month_wise_duration_1;"
    },

    {
        "question": "Show uploaded, created, published counts per input type.",
        "sql": "SELECT \"Input Type\", \"Uploaded Count\", \"Created Count\", \"Published Count\" FROM combined_data2025_3_1_2026_2_28_by_input_type_1;"
    },

    {
        "question": "Get total uploaded, created, published counts per channel and user.",
        "sql": "SELECT Channel, User, \"Uploaded Count\", \"Created Count\", \"Published Count\" FROM combined_data2025_3_1_2026_2_28_by_channel_and_user_1;"
    },

    {
        "question": "Retrieve channel-wise publishing durations.",
        "sql": "SELECT Channels, \"Facebook Duration\", \"Instagram Duration\", \"Reels Duration\", \"Shorts Duration\", \"Youtube Duration\", \"Total Duration\" FROM channel_wise_publishing_duration_og;"
    },

    {
        "question": "Find total uploaded, created, published counts per output type.",
        "sql": "SELECT \"Output Type\", \"Uploaded Count\" AS Total_Uploaded, \"Created Count\" AS Total_Created, \"Published Count\" AS Total_Published FROM combined_data2025_3_1_2026_2_28_by_output_type_1;"
    },

    {
        "question": "Get total uploaded, created, published counts per language.",
        "sql": "SELECT Language, \"Uploaded Count\", \"Created Count\", \"Published Count\" FROM combined_data2025_3_1_2026_2_28_by_language_2;"
    },

    {
        "question": "Get published videos per user.",
        "sql": "SELECT User, \"Published Count\" FROM combined_data2025_3_1_2026_2_28_by_user_1;"
    },

    {
        "question": "Show monthly trends",
        "sql": "SELECT * FROM monthly_chart_1 ORDER BY Month;"
    },

    {
        "question": "What are the top users by published count",
        "sql": "SELECT User, \"Published Count\" FROM combined_data2025_3_1_2026_2_28_by_user_1 ORDER BY \"Published Count\" DESC LIMIT 10;"
    },

    {
        "question": "Show data by output type",
        "sql": "SELECT * FROM combined_data2025_3_1_2026_2_28_by_output_type_1;"
    },

    {
        "question": "Get channel performance",
        "sql": "SELECT * FROM channel_wise_publishing_og;"
    },

    {
        "question": "Show language distribution",
        "sql": "SELECT * FROM combined_data2025_3_1_2026_2_28_by_language_2;"
    }
]
# =========================
# MATCHING LOGIC
# =========================
def get_demo_sql(question):

    question_lower = question.lower()

    for entry in fixed_fallback_sql_list:
        entry_keywords = entry["question"].lower().split()
        question_keywords = question_lower.split()

        matches = sum(1 for keyword in entry_keywords if keyword in question_keywords)

        if matches >= len(entry_keywords) * 0.6:
            return entry["sql"]

    for entry in fixed_fallback_sql_list:
        if any(word in question_lower for word in entry["question"].lower().split()[:3]):
            return entry["sql"]

    return None


# =========================
# SQL EXECUTION
# =========================
def run_sql_query(sql):

    if not sql.lower().startswith("select"):
        return "❌ Only SELECT queries allowed!"

    try:
        conn = sqlite3.connect(DB_PATH)
        df = pd.read_sql_query(sql, conn)
        conn.close()

        return {
            "sql": sql,
            "data": df.to_dict("records"),
            "columns": list(df.columns),
            "row_count": len(df)
        }

    except Exception as e:
        return f"❌ SQL Error: {str(e)}"


# =========================
# CHAT API
# =========================
@router.post("/")
def chat(message: dict):

    user_message = message.get("message", "").strip()

    if not user_message:
        raise HTTPException(status_code=400, detail="Message is required")

    sql = get_demo_sql(user_message)

    if not sql:
        return {
            "reply": "❌ Could not generate SQL. Try rephrasing.",
            "sql": "",
            "data": [],
            "columns": [],
            "row_count": 0
        }

    result = run_sql_query(sql)

    if isinstance(result, str):
        return {
            "reply": result,
            "sql": sql,
            "data": [],
            "columns": [],
            "row_count": 0
        }

    data_preview = result["data"][:10]

    reply = f"📊 Found {result['row_count']} results\n\n"
    reply += f"🧾 SQL: {sql}\n\n"

    if data_preview:
        for row in data_preview:
            reply += " | ".join([f"{k}: {v}" for k, v in row.items()]) + "\n"

    return {
        "reply": reply,
        "sql": result["sql"],
        "data": result["data"],
        "columns": result["columns"],
        "row_count": result["row_count"]
    }