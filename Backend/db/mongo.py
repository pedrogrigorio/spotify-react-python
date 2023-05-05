import motor.motor_asyncio
from bson.objectid import ObjectId
import pydantic
from engine_api import api_requests

from PIL import Image
from io import BytesIO
import requests
from colorthief import ColorThief

pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str



client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://mongo:27017/')

if client is not None:
    print("Conexão com o banco de dados MongoDB estabelecida com sucesso!")
else:
    print("Não foi possível estabelecer conexão com o banco de dados MongoDB.")

database = client['spotify']
collection = database['user_playlists']

async def fetch_all_playlists():
    cursor = collection.find()
    playlists = []
    async for playlist in cursor:
        playlists.append(playlist)
    return playlists


async def fetch_one_playlist(id: str):
    document = await collection.find_one({"_id": ObjectId(id)})
    return document


async def create_user_playlist():
    id = await collection.count_documents({}) + 1
    document = {"name": "Minha playlist nº " + str(id), "color_theme": [83, 83, 83], "cover": [], "songs": []}
    result = await collection.insert_one(document)
    created_document = await collection.find_one({"_id": result.inserted_id})
    return created_document


async def delete_playlist(id: str):
    result = await collection.delete_one({"_id": ObjectId(id)})
    return True

async def add_song(id: str, song: object):
    # add new song
    old_document = await collection.find_one({'_id': ObjectId(id)})
    songs = old_document['songs']
    songs.append(song)
    song_added = await collection.update_one({'_id': ObjectId(id)}, {'$set': {'songs': songs}})

    # add to "songs_cover"
    covers = old_document['cover']
    if (len(songs) <= 4):
        img = api_requests.get_cover_by_id(song['id']) #get image with greater resolution
        covers.append(img)
        cover_added = await collection.update_one({'_id': ObjectId(id)}, {'$set': {'cover': covers}})
    
    if (len(songs) == 1):
        color_theme = get_dominant_color(covers[0])
        print(color_theme)
        color_added = await collection.update_one({'_id': ObjectId(id)}, {'$set': {'color_theme': color_theme}})

    if (len(songs) == 4):
        colors = []
        for image in covers:
            color = get_dominant_color(image)
            colors.append(color)
        
        r = (colors[0][0] + colors[1][0] + colors[2][0] + colors[3][0]) // 4
        g = (colors[0][1] + colors[1][1] + colors[2][1] + colors[3][1]) // 4
        b = (colors[0][2] + colors[1][2] + colors[2][2] + colors[3][2]) // 4
        mean_color = [r, g, b]

        print(colors)
        print(mean_color)

        color_added = await collection.update_one({'_id': ObjectId(id)}, {'$set': {'color_theme': mean_color}})
   
    return True

def get_dominant_color(url):
    # response = requests.get(url)
    # img = BytesIO(response.content)
    
    # ct = ColorThief(img)
    # dominant_color = ct.get_color(quality=1)

    response1 = requests.get(url)
    img = Image.open(BytesIO(response1.content))

    width, height = img.size

    crop_width = int(width * 0.75)
    crop_height = int(height * 0.75)

    # Obtém o centro da imagem
    center_x = width // 2
    center_y = height // 2

    # Obtém o retângulo central
    left = center_x - crop_width // 2
    top = center_y - crop_height // 2
    right = center_x + crop_width // 2
    bottom = center_y + crop_height // 2

    # Obtém a imagem recortada
    cropped_img = img.crop((left, top, right, bottom))

    cropped_bytes  = BytesIO()
    cropped_img.save(cropped_bytes, format='PNG')
    cropped_bytes = cropped_bytes.getvalue()

    ct = ColorThief(BytesIO(cropped_bytes))
    dominant_color = ct.get_color(quality=1)

    return list(dominant_color)