"""
启动脚本 - 用于初始化数据库和运行服务器
"""
import uvicorn
from app.db.database import init_db

if __name__ == "__main__":
    # 初始化数据库（创建表）
    print("Initializing database...")
    init_db()
    print("Database initialized successfully!")
    
    # 启动服务器
    print("Starting FastAPI server...")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )

