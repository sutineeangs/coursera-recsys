#!/usr/bin/env python
# coding: utf-8

# In[63]:


from flask import Flask, request, jsonify
from flask_cors import CORS
# import recsys_v1
import recsys_v2


# In[57]:


data = [
    {
        "id": 1,
        "frameworks": "Django",
        "year": 2005
    },
    {
        "id": 2,
        "frameworks": "Flask",
        "year": 2010
    },
    {
        "id": 3,
        "frameworks": "Web2Py",
        "year": 2007
    }
]
empty = []


# In[60]:


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello World"


@app.route('/api', methods=['GET'])
def get_api():
    return jsonify(data)  # Return web frameworks information

@app.route('/api/getCourses', methods=['GET'])
def get_api_courses():
    res = recsys_v2.getCourses()
    res = recsys_v2.getJsonData(res)
    return jsonify(res)

@app.route('/api/recommend1', methods=['GET'])
def get_api_recommend1():
    try:
        search = request.args.get("search")
        if search == None:
            return jsonify(empty)
        if search == '':
            return jsonify(empty)
        res = recsys_v2.recommend1(search)
        res = recsys_v2.getJsonData(res)
        return jsonify(res)
    except:    
        return jsonify(empty)

@app.route('/api/recommend2', methods=['GET'])
def get_api_recommend2():
    try:
        search = request.args.get("search")
        if search == None:
            return jsonify(empty)
        if search == '':
            return jsonify(empty)
        res = recsys_v2.recommend2(search)
        res = recsys_v2.getJsonData(res)
        return jsonify(res)
    except:    
        return jsonify(empty)

if __name__ == "__main__":
    app.run(debug=True)

