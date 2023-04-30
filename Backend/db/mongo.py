import pymongo
import motor.motor_asyncio
from bson.objectid import ObjectId
import pydantic
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
    document = {"name": "Minha playlist nº " + str(id), "songs": {}}
    result = await collection.insert_one(document)
    created_document = await collection.find_one({"_id": result.inserted_id})
    return created_document


async def delete_playlist(id: str):
    result = await collection.delete_one({"_id": ObjectId(id)})
    return True