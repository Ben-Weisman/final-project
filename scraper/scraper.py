from asyncio.windows_events import NULL
from unicodedata import category
import requests
from bs4 import BeautifulSoup
import json
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/getUrl")
def getUrl():
    url = request.args['url']
    return main(url)




#from utils.validations import validateRecipe
# url = "https://www.bbc.co.uk/food/recipes/healthier_coconut_38904"


# content = res.text


# lookFor= "li"
# lis = soup.find_all(lookFor,class_="recipe-ingredients__list-item")
# print(len(lis))
# for li in lis:
#     print(li.text)
# print(res)
# print(res.status_code==200)


# index = (content.index("Coconut chicken curry"))
# print(content[index:index+200])

# def createRecipeJson(soap,url):

    # title = getTitle(soap)    

def getJsonFromDB(url):
    try: 
        with open("utils\scraperDB.json","r") as f:
            data = json.load(f)
            for site in data["webSitesUrl"]:
                if url.find(site['url']) != -1:
                    return site
            return NULL
    except:
        print("something went wrong")
    finally:
        f.close()


def getTitle(soup, recipeIndexJson):
    title = soup.find_all(recipeIndexJson['title']['lookFor'],class_=recipeIndexJson['title']['className'])
    return title[0].text


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

# def getImage(soup,recipeIndexJson):  /// for later

def getCategory(soup, recipeIndexJson):
    categories = soup.find_all(recipeIndexJson['category']['lookFor'],class_=recipeIndexJson['category']['className'])
    if category[0] != []:
        return category[0].text


def createRecipeJson(soup, recipeIndexJson):
    try:
        title = getTitle(soup, recipeIndexJson)
        description = getDescription(soup, recipeIndexJson)
        ingredients = getIngredients(soup, recipeIndexJson)
        method = getMethod(soup, recipeIndexJson)
        try:
            category = getCategory(soup, recipeIndexJson)
        except:
            print("No category")
    # image = getImage(soup,recipeIndexJson)  /// for later
        dic = {}
        dic["owner_id"] = "59dc8b97-6fae-4dcc-82ed-7cd8e21340a0"
        dic["recipe_name"] = title
        dic["recipe_description"] = description
        dic["category"] = "italian"
        dic["recipe_instructions"] = method
        dic["ingredients"] = ingredients

        return json.dumps(dic)

    except:
        print("error in createRecipeJson")


def main(url):
    res = requests.get(url)
    content = res.text
    soup = BeautifulSoup(content, features="html.parser")
    try: 
       recipeIndexJson = getJsonFromDB(url)
       if recipeIndexJson != NULL:
        # print(recipeIndexJson)
        recipeJson = createRecipeJson(soup, recipeIndexJson)

        print(recipeJson) # test log
        key = "body"
        newHeaders = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        req = requests.post('http://localhost:3000/api/v1/recipes/add-new', json={key:recipeJson},headers=newHeaders)

        print(req)
        return recipeJson
       # validateRecipe(recipeJson)
    except:
        print("couldn't find json")


if __name__ == '__main__':
    #url = "https://www.bbc.co.uk/food/recipes/healthier_coconut_38904"
    #url = getUrl()
    #main(url)
    app.run(debug=True)