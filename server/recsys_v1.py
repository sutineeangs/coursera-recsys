#!/usr/bin/env python
# coding: utf-8

# In[27]:


import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import CountVectorizer
import nltk #for stemming process
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from wordcloud import WordCloud
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import json
print('Dependencies Imported')
# import test
# print(test.test())


# In[14]:


# Coursera Course Recommendation System+WebApp
# https://www.kaggle.com/code/sagarbapodara/coursera-course-recommendation-system-webapp


# In[15]:


def getCourses():
    # Read file
    data = pd.read_csv("../data/Coursera.csv")
#     data = data[['Course Name','Difficulty Level','Course Description','Skills']]
    return data


# In[31]:


def getJsonData(df):
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return parsed
#     return json.dumps(parsed, indent=4)  


# In[17]:


#defining the stemming function
# def stem(text, ps):
#     y=[]
    
#     # Stemming Process
# #     ps = PorterStemmer()
    
#     for i in text.split():
#         y.append(ps.stem(i))
    
#     return " ".join(y)


# In[18]:


# Recommendation Function
def recommend1(course):
    
    # Get data
    courses = getCourses()
    data = courses.copy()
    
    # Removing spaces between the words (Lambda funtions can be used as well)
    data['course_name'] = data['Course Name'].copy()
    data['Course Name'] = data['Course Name'].str.replace(' ',',')
    data['Course Name'] = data['Course Name'].str.replace(',,',',')
    data['Course Name'] = data['Course Name'].str.replace(':','')
    
    courses['course_name_index'] = data['Course Name'].str.replace(',',' ')
    
    data['Course Description'] = data['Course Description'].str.replace(' ',',')
    data['Course Description'] = data['Course Description'].str.replace(',,',',')
    data['Course Description'] = data['Course Description'].str.replace('_','')
    data['Course Description'] = data['Course Description'].str.replace(':','')
    data['Course Description'] = data['Course Description'].str.replace('(','')
    data['Course Description'] = data['Course Description'].str.replace(')','')

    #removing paranthesis from skills columns 
    data['Skills'] = data['Skills'].str.replace('(','')
    data['Skills'] = data['Skills'].str.replace(')','')
    
    data['tags'] = data['Course Name'] + data['Difficulty Level'] + data['Course Description'] + data['Skills']
    
    new_df = data[['Course Name','tags']]
    new_df['tags'] = data['tags'].str.replace(',',' ')
    new_df['Course Name'] = data['Course Name'].str.replace(',',' ')
    new_df.rename(columns = {'Course Name':'course_name'}, inplace = True)
    new_df['tags'] = new_df['tags'].apply(lambda x:x.lower()) #lower casing the tags column
    
    # Text Vectorization
    cv = CountVectorizer(max_features=5000,stop_words='english')
    vectors = cv.fit_transform(new_df['tags']).toarray()
    
    ps = PorterStemmer()
    
    #defining the stemming function
    def stem(text):
        y=[]
    
        for i in text.split():
            y.append(ps.stem(i))
    
        return " ".join(y)
    
    new_df['tags'] = new_df['tags'].apply(stem) #applying stemming on the tags column
    
    similarity = cosine_similarity(vectors)
    
    course_index = new_df[new_df['course_name'] == course].index[0]
    distances = similarity[course_index]
    course_list = sorted(list(enumerate(distances)),reverse=True, key=lambda x:x[1])[1:7]
    
    course_names = []
    for i in course_list:
        course_names.append(new_df.iloc[i[0]].course_name)
    #print(course_names)
    return courses.set_index('course_name_index').loc[course_names].reset_index()


# In[19]:


# Coursera Course Recommendation Engine 
# https://www.kaggle.com/code/brijlaldhankour/coursera-course-recommendation-engine


# In[20]:


# Creating autocpt arguments 
def func(pct, allvalues): 
    absolute = int(pct / 100.*np.sum(allvalues)) 
    return "{:.1f}%\n({:d} g)".format(pct, absolute) 


# In[21]:


def plotGraph1():
    # Get data
    courses = getCourses()
    df = courses.copy()
    
    # This dataframe contains some useless columns which must be dropped for a better analytics result
    uc = ['Course URL']  # uc means useless columns
    df = df.drop(columns=uc)
    
    # Data Inferencing
    r,c = df.shape
    #======================== Plot Graph =====================================#
    # Data Visualization
    datavis = df['Difficulty Level'].value_counts()
    datavis
    mag = datavis.index
    data = datavis.values
    explode = (0.1,0.0,0.0,0.0,0.0) 

    # Creating color parameters 
    colors = ("lightblue","crimson","yellow","green","violet") 

    # Wedge properties 
    wp = { 'linewidth' : 1, 'edgecolor' : "white" } 

    # Creating plot 
    fig, ax = plt.subplots(figsize =(15, 10)) 
    wedges, texts, autotexts = ax.pie(data,  
                                      autopct = lambda pct: func(pct, data), 
                                      explode = explode,  
                                      labels = mag, 
                                      shadow = True, 
                                      colors = colors, 
                                      startangle = 90, 
                                      wedgeprops = wp, 
                                      textprops = dict(color ="black")) 

    # Adding legend 
    ax.legend(wedges, mag, 
              title ="Values", 
              loc ="center left", 
              bbox_to_anchor =(1, 0, 0.5, 1)) 

    plt.setp(autotexts, size = 10, weight ="bold") 
    ax.set_title("Payment type of course\n",size=19) 

    # show plot 
    plt.show()
    #=========================================================================#


# In[22]:


def plotGraph2():
    # Get data
    courses = getCourses()
    df = courses.copy()
    
    # This dataframe contains some useless columns which must be dropped for a better analytics result
    uc = ['Course URL']  # uc means useless columns
    df = df.drop(columns=uc)
    
    # Data Inferencing
    r,c = df.shape
    #======================== Plot Graph =====================================#
    df['Course Rating'].value_counts()
    df = df[df['Course Rating'] != 'Not Calibrated']
    df['Course Rating'] = df['Course Rating'].astype(float)
    plt.figure(figsize=(18,7))
    sns.countplot(data=df,x='Course Rating',palette='plasma')
    plt.xlabel('Course Ratings',fontsize='16',color='blue')
    plt.ylabel('Number of courses',fontsize='16',color='blue')
    plt.xticks(fontsize='14',color='green')
    plt.yticks(fontsize='14',color='red')
    plt.title("Count of course types\n",fontsize=24,fontweight='bold',color='indigo')
    #=========================================================================#


# In[23]:


# Recommendation Function
def recommend2(course_title):
    
    # Get data
    courses = getCourses()
    df = courses.copy()
    
    # This dataframe contains some useless columns which must be dropped for a better analytics result
    uc = ['Course URL']  # uc means useless columns
    df = df.drop(columns=uc)
    
    # Data Inferencing
    r,c = df.shape
    #print("Number of customers  = ",r)
    #print("Number of parameters = ",c)
    #print(df.info())
    #print("Are there any missing values in the dataset ?",df.isna().values.any())

    # complete summary of dataset
    #df.describe().T
    
    df = df[df['Course Rating'] != 'Not Calibrated']
    df['Course Rating'] = df['Course Rating'].astype(float)
    #=========================================================================#
    # Filtering required data
    df2 = df[df['Course Rating'] > 4.0]
    #=========================================================================#
    # Making NLP Model for Recommendation Engine
    cv=TfidfVectorizer()
    tfidf_matrix=cv.fit_transform(df['Course Name'])
    course_user = df.pivot_table(columns='Course Name',values='Course Rating')
    course_user.head()
    df = df.rename(columns={'Course Name':'course_title'})
    
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    indices=pd.Series(df.index,index=df['course_title'])
    titles=df['course_title']

    # Running Recommendation Engine on variety of course genres
    idx = indices[course_title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    course_indices = [i[0] for i in sim_scores]
    return courses.loc[titles.iloc[course_indices].index]


# In[33]:


# Test functions
# recommend1('Business Strategy Business Model Canvas Analysis with Miro') 

# plotGraph1()
# plotGraph2()

# TOPIC : 1 TV shows and telecast
# print("--------------- Similar courses to your search --------------:\n")
# recommend2('Write A Feature Length Screenplay For Film Or Television')

# TOPIC : 2 Database and related courses
# print("--------------- Similar courses to your search --------------:\n")
# recommend2('Retrieve Data using Single-Table SQL Queries')

# TOPIC : 3 Finance related
# print("--------------- Similar courses to your search --------------:\n")
# recommend2('Finance for Managers')
# getJsonData(recommend2('Finance for Managers'))


# In[ ]:




