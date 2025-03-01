#implementing MongoDB API in this class using mapbox

import urllib.parse
import requests
from pymongo import MongoClient
from bson.objectid import ObjectId

def mapbox_address(address, access_token):
    """Uses mapbox geocoding to convert address' into coordinates"""
    
    encoded_address = urllib.parse.quote(address)
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{encoded_address}.json"
    params = {
        "access_token" : access_token, "limit" : 1
        }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        features = data.get("features", [])
        
        if features:
            return features[0]["center"]
        else:
            raise Exception("No results found for the address stated.")
    else:
        raise Exception(f"Error in the geocoding process: {response.status_code} - {response.text}")

#mongodb connection setup
client = MongoClient("mongodb+srv://hgrichar:winnerchickendinner@websitecluster.azpqk.mongodb.net/?retryWrites=true&w=majority&appName=WebsiteCluster")
db = client["hackathon25_db"]
listings_collection = db["listings"]

listings_collection.create_index([("location", "2dsphere")])

def add_listing_w_addy(title, description, price, address, mapbox_access_token):
    """This method geocodes given address using mapbox, and inserts a new listing into mongoDB"""
    try:
        coordinates = mapbox_address(address, mapbox_access_token)
        listing = {
            "title" : title,
            "description" : description,
            "price" : float(price),
            "location" : {
                "type": "Point",
                "coordinates": coordinates
            }
        }
        
        result = listings_collection.insert_one(listing)
        #print("Inserted listing with ID: ", result.inserted_id)
        return listing
    
    except Exception as e:
        print("There was an error adding listing: ", e)
        return None
    
def get_distance_listing(buyer_location, listing_id):
        """Calculates distance between buyer and seller"""
        if not isinstance(listing_id, ObjectId):
            listing_id = ObjectId(listing_id)
            
        pipeline = [
            {
                "$geoNear" : {
                    "near": {"type": "Point", "coordinates": buyer_location},
                    "distanceField": "distance",
                    "spherical": True,
                    "query": {"_id": listing_id}
                }
            }
        ]
        
        results = list(listings_collection.aggregate(pipeline))
        if results:
            distance_miles = results[0]["distance"] / 1609.34
            return distance_miles
        else:
            return None
    
if __name__ == "__main__":
    mapbox_access_token = "pk.eyJ1IjoiaGdyaWNoYXIiLCJhIjoiY203cWoxY25iMHZ6YTJrcTV6MnhzdjJpZSJ9.FKfPamaNf4p_PetUQOeQhA"
    test_address = "409 Dalton Drive, Colchester, VT 05446"
    listing = add_listing_w_addy(
        title = "Test Listing",
        description = "A test listing to check geocoding and insertion",
        price = 50.00,
        address = test_address,
        mapbox_access_token = mapbox_access_token
    )
    
    if listing:
        #print ("Listing was successfully added!!")
        #print(listing)
    
    #example simulating buyers location (replace long and lat with actual buyer location
        #make sure to work with group to see when buyer location will be implemented and edit this from there
        buyer_location = [-73.938573, 40.235421] #example long lat
        distance = get_distance_listing(buyer_location, listing["_id"])
        if distance is not None:
            print(f"Distance from Buyer to Listing: {distance:.2f} miles")
        else:
            print("Distance could not be calculated for the listing.")
    else:
        print("Failed to add listing!!")
        
