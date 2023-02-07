import redis

# Setting up redis connection
redis_conn = redis.Redis(host='localhost', port=6379, db=0)