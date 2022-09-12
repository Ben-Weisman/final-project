from unicodedata import category
import requests
from bs4 import BeautifulSoup
import json
from flask import Flask
from flask import request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/getUrl")
#get the url of thw recipe from the chrome extension
def getUrl():
    url = request.args['url']
    return main(url)


@app.route("/receiveJson", methods=['GET', 'POST'])
#recieve json from the chrome extension and send it to the app
def receiveJson():
    if request.method == 'POST':
        updatedJson = request.data
 
    req = requests.post('http://localhost:3000/api/v1/recipes/add-new', data=updatedJson, headers={'Content-type': 'application/json', 'Accept': 'application/json'})

    return('d')



def getJsonFromDB(url):
    try: 
        with open("utils\scraperDB.json","r") as f:
            data = json.load(f)
            for site in data["webSitesUrl"]:
                if url.find(site['url']) != -1:
                    return site
            return None
    except:
        print("something went wrong")
    finally:
        f.close()


def getTitle(soup, recipeIndexJson):
    title = soup.find(recipeIndexJson['title']['lookFor'],class_=recipeIndexJson['title']['className'])
    return title.text


def getDescription(soup, recipeIndexJson):
    description = soup.find_all(recipeIndexJson['description']['lookFor'],class_=recipeIndexJson['description']['className'])
    return description[0].text


def getIngredients(soup, recipeIndexJson):
    ingredientsList = soup.find_all(recipeIndexJson['ingredients']['lookFor'],class_=recipeIndexJson['ingredients']['className'])
    ingredients = []
    for ingredientEl in ingredientsList:
        ingredients.append(ingredientEl.text)
    return ingredients


def getMethod(soup, recipeIndexJson):
    methodList = soup.find_all(recipeIndexJson['method']['lookFor'],class_=recipeIndexJson['method']['className'])
    methods = []
    for method in methodList:
        methods.append(method.text)
    return methods

def getImage(soup, recipeIndexJson): 
   image = soup.find(recipeIndexJson['image']['lookFor'],class_=recipeIndexJson['image']['className']).find("img")
   return image['src']

def getCategory(soup, recipeIndexJson):
    categories = soup.find_all(recipeIndexJson['category']['lookFor'],class_=recipeIndexJson['category']['className'])
    if category[0] != []:
        return category[0].text


def createRecipeJson(soup, recipeIndexJson, url):
    try:
        title = getTitle(soup, recipeIndexJson)
        description = getDescription(soup, recipeIndexJson)
        ingredients = getIngredients(soup, recipeIndexJson)
        method = getMethod(soup, recipeIndexJson)
        image = getImage(soup,recipeIndexJson) 
        try:
            category = getCategory(soup, recipeIndexJson)
        except:
            print("No category")
  
        dic = {}
        dic["owner_id"] = "59dc8b97-6fae-4dcc-82ed-7cd8e21340a0"
        dic["recipe_name"] = title
        dic["recipe_description"] = description
        #dic["category"] = "italian"
        dic["recipe_instructions"] = method
        dic["ingredients"] = ingredients
        dic["image"] = image
        dic["url"] = url

        return json.dumps(dic)

    except:
        print("error in createRecipeJson")

def tryToCreactRecipe(soup, url):
    title = soup.h1.text
    if title is None:
        title = ""

    description = soup.p.text
    if description is None:
        description = ""

    ingredientsList = soup.find_all("span","ingredient-description") or soup.find_all("div","ingredient-description")                          
    if ingredientsList is None:
        ingredients = [] 
    else:
        ingredients = []
        for ingredientEl in ingredientsList:
         ingredients.append(ingredientEl.text)
         print(ingredientEl)


    dic = {}
    #dic["owner_id"] = "59dc8b97-6fae-4dcc-82ed-7cd8e21340a0"
    dic["recipe_name"] = title
    dic["recipe_description"] = description
    dic["recipe_instructions"] = []
    dic["ingredients"] = ingredients
    dic["image"] = ""
    dic["url"] = url

    return json.dumps(dic)




def main(url):
    res = requests.get(url)
    content = res.text
    soup = BeautifulSoup(content, features="html.parser")
    try: 
       recipeIndexJson = getJsonFromDB(url)
       if recipeIndexJson is not None:
        recipeJson = createRecipeJson(soup, recipeIndexJson, url)

       else:
        recipeJson = tryToCreactRecipe(soup, url) 

        print(recipeJson) # test log


        #print(req)
        return recipeJson
       # validateRecipe(recipeJson)
    except:
        print("couldn't find json")


if __name__ == '__main__':
    app.run(debug=True)



