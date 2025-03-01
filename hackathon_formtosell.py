# form to insert an item to be sold by seller

class SellListing:
    def __init__(perso, title, desc, price, loco):
        perso.title = title
        perso.desc = desc
        perso.price = price
        perso.loco = loco
    
    def final_rep(perso):
        # """Return a dictionary rep. or the listing"""
        return {
            'title': perso.title,
            'description': perso.desc,
            'price': perso.price,
            'location': perso.loco,
        }
        
class SellList:
    def __init__(perso):
        perso.listings = []
        
    def add_listing(perso, title, desc, price, loco):
        #validating title and desc
        if not title:
            raise ValueError("Must include a title!")
        if not desc:
            raise ValueError("Must include a description!")
        #now validate price since its a float, loco next
        try:
            price = float(price)
        except (ValueError, TypeError):
            raise ValueError("Price is not a valid number!")
        if price <= 0:
            raise TypeError("Price must be a positive number!")
        #now loco here
        if not isinstance(loco, dict):
            raise ValueError("Location must be provided with 'latitude' and 'longitude'!")
        if 'latitude' not in loco or 'longitude'not in loco:
            raise ValueError("Lococation must contain both longitude and latitude variables.")
            
        #creating a new listing now
        listing = SellListing(title, desc, price, loco)
        perso.listings.append(listing)
        return listing #!!!!bang out baby , who forgets python, not me
    
    def list_tree(perso):
        #"""This will return a list of all listings as dictionaries!"""
        return [listing.final_rep() for listing in perso.listings]
    
if __name__ == "__main__":
    seller_listing = SellList()
    
    try:
        #Here is where you can add a listing, will keep it as replaceable text for now
        listing1 = seller_listing.add_listing(
            title = "Enter Title Here",
            desc = "Enter Description Here",
            price = 10.00,
            loco = {"latitude": 50.00, "longitude": 60.00}
            )
        print("Listing has been added successfully!!")
        print(listing1.final_rep())
        
        #Add one more example listing
        listing2 = seller_listing.add_listing(
            title = "Enter another Title Here",
            desc = "Enter another description here",
            price = 10.00,
            loco = {"latitude":20.00, "longitude":30.00}
            )
        print ("Here is Another Listing that's Successfully been Added")
        
    except ValueError as error:
        print("There was an error adding listings: ", error)
        
    #now print all of the listings as a complete set
    print("\nAll Listings: ")
    for listing in seller_listing.list_tree():
        print(listing)

