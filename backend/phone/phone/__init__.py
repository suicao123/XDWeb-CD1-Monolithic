import pymysql

# 1. Đánh lừa Django về phiên bản thư viện mysqlclient
pymysql.version_info = (2, 2, 1, "final", 0)
pymysql.install_as_MySQLdb()