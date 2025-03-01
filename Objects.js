class Account {
    // str
    #name;
    // str
    #userId;
    // str
    #email;
    // str
    #password;
    // str
    #location;
    // str
    #rating;
    // list
    listings;

    

    constructor(name, email, password, location) {
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#location = location;
        this.generateUserId();
        rating = -1.0;

    }
    
    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    generateUserId() {
        for (let i = 0; i < this.getEmail().length; i++) {
            userId += this.getEmail.charCodeAt(i).toString();
        }
        userId += Date.now().toString;
        userId = parseInt(userId);
    }

    getUserId() {
        return this.#userId;
    }

    getEmail() {
        return this.#email;
    }

    setEmail(email) {
        this.#email = email;
        
    }

    getPassword() {
        return this.#password;
    }

    setPassword(password) {
        this.#password = password;
    }

    getLocation() {
        return this.#location;
    }

    setLocation(location) {
        this.#location = location;
    }

    getRating() {
        return this.#rating;
    }

    setRating(rating) {
        this.#rating = rating;
    }

    addListing(listing) {
        this.listings.push(listing);
    }

    removeListing(listing) {
        for (let i = 0; i < this.listings.length; i++) {
            if (this.listings[i].getListingId() == listing.getListingId()) {
                listings.slice(i, i);
            }
        }
    }

    getListings() {
        return this.listings;
    }

    getListing(listing) {
        for (let i = 0; i < listings.length; i++) {
            if (listings[i].getListingId() == listing.getListingId()) {
                return listings[i];
            }
        }
    }


}

class Organization extends Account {
    type;
    orgId;

    constructor(name, email, password, location, type) {
        super(name, email, password, location);
        this.type = type;
        generateOrgId();
    }

    generateOrgId() {
        for (let i = 0; i < this.getEmail().length; i++) {
            orgId += this.getEmail.charCodeAt(i).toString();
        }
        orgId += Date.now().toString;
        orgId = -1 * parseInt(orgId);
    }

    getOrgId() {
        return this.orgId;
    }

    approveOrg() {
        orgId = -1 * this.orgId;
    }

    getType() {
        return this.type;
    }

    getOrgId() {
        return this.orgId;
    }

}

class Listing {
    //str
    #listingId;
    // str
    #userId;
    // str
    #name;
    // float
    #price;
    // str
    #description;
    // list
    images;

    constructor(userId, name, price, description) {
        this.#userId = userId;
        this.#name = name;
        this.#price = price;
        this.#description = description;
        this.generateListingId();
    }

    getUserId() {
        return this.#userId;
    }

    setUserId(userId) {
        this.#userId = userId;
    }

    generateListingId() {
        this.#listingId = userId + Date.now().toString;
        this.#listingId = -1 * parseInt(this.#listingId);
    }

    getListingId() {
        return this.#listingId;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getPrice() {
        return this.#price;
    }

    setPrice(price) {
        this.#price = price;
    }

    addImages(img) {
        images.push(img);
    }

    getImageIds() {
        imageIds;
        for (let i = 0; i < this.images.length; i++) {
            imageIds.push(image.getImageId())
        }
        return imageIds;
    }

    removeImage(img) {
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].getImageId() == img.getImageId()) {
                images.slice(i, i);
            }
        }
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }


}

class Rental extends Listing {
    safteyDeposit;
    paySchedule;
    startDate;
    endDate;
    duration;

    constructor(userId, name, price, description, safteyDeposit, paySchedule, startDate, endDate) {
        super(userId, name, price, description);
        this.safteyDeposit = safteyDeposit;
        this.paySchedule = paySchedule;
        this.startDate = startDate;
        this.endDate = endDate;
        
    }

    getSafteyDeposit() {
        return this.safteyDeposit;
    }

    setSafteyDeposit(safteyDeposit) {
        this.safteyDeposit = safteyDeposit;
    }

    getPaySchedule() {
        return this.paySchedule;
    }

    setPaySchedule(paySchedule) {
        this.paySchedule = paySchedule;
    }

    getStartDate() {
        return this.startDate;
    }

    setStartDate(startDate) {
        this.startDate = startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    setEndDate(endDate) {
        this.endDate = endDate;
    }

    getDuration() {
        return this.duration;
    }

    generateDuration() {
        duration = this.endDate - this.startDate;
    }




}

class Image {
    imageId;
    imageExtension;

    constructor(name) {
        this.generateImageId(name);
        this.findImageExtension(name);
    }

    generateImageId(name) {
        for (let i = 0; i < name.length; i++) {
            imageId += name.charCodeAt(i).toString();
        }
        imageId = imageId + Date.now().toString()
        imageId = parseInt(imageId);
    }

    findImageExtension(name) {
        periodIndex = name.indexOf(".");
        this.imageExtension = name.substring(periodIndex);
    }

    getImageId() {
        return this.imageId;
    }

    getImageExtension() {
        return this.imageExtension;
    }
}