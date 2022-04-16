import redis

red_host = 'localhost'
red_port = 6379

def redis_string():
    r = redis.StrictRedis(host=red_host,port=red_port, decode_responses=True)

    r.set("message", "hello word!")
    msg = r.get("message")
    print(msg)