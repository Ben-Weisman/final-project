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
 
    req = requests.post('http://44.204.147.28:3000/api/v1/recipes/add-new', data=updatedJson, headers={'Content-type': 'application/json', 'Accept': 'application/json'})

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
  
        dic = {}
        dic["owner_id"] = "59dc8b97-6fae-4dcc-82ed-7cd8e21340a0"
        dic["recipe_name"] = title
        dic["recipe_description"] = description
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

    ingredientsList = soup.find_all("span","ingredient-description") or soup.find_all("div","ingredient-description") or soup.find_all("span","ingredients-item-name elementFont__body") or soup.find_all("li","pb-xxs pt-xxs list-item list-item--separator") or soup.find_all("span","recipe__list-qty") or soup.find_all("div","ingredient-description") or soup.find_all("span","ingredients-item-name elementFont__body") or soup.findAll(
            'li',
            {'itemprop': "recipeIngredient"}
        )                      
    if ingredientsList is None:
        ingredients = [] 
    else:
        ingredients = []
        for ingredientEl in ingredientsList:
         ingredients.append(ingredientEl.text)

    instructionsList = soup.find_all("div","paragraph") or soup.find_all("div","recipe-method-step-content") or soup.find_all("div","editor-content") or         soup.find(
            'div',
            {'class': 'directions'}
        ).findAll('li')   
                  
    if instructionsList is None:
        instructions = [] 
    else:
        instructions = []
        for instructionEl in instructionsList:
         instructions.append(instructionEl.text)


    image = soup.img['src'] 
    if image is None:
        image = "data:image/png;base64,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"


    dic = {}
    #dic["owner_id"] = "59dc8b97-6fae-4dcc-82ed-7cd8e21340a0"
    dic["recipe_name"] = title
    dic["recipe_description"] = description
    dic["recipe_instructions"] = instructions
    dic["ingredients"] = ingredients
    dic["image"] = image
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



