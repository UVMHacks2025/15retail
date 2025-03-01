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

    getListings() {
        return this.listings;
    }

    getListing(listingId) {
        for (let i = 0; i < listings.length; i++) {
            if (listings[i].getListingId() == listingId) {
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
    // list
    img_ids;
    // str
    #description;

    constructor(userId, name, price, img_ids, description) {
        this.#userId = userId;
        this.#name = name;
        this.#price = price;
        this.img_ids = img_ids;
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

    getImg_ids() {
        return this.img_ids;
    }

    addImg(img) {
        img_ids += img;
    }

    getImg(img) {
        for (let i = 0; i < img_ids.length; i++) {
            if (img_ids[i] == img) {
                return img;
            }
        }
    }

    getDes


}

class Rental extends Listing {
    safteyDeposit;
    paySchedule;
    startDate;
    endDate;
    duration;

    constructor(userId, name, price, img_ids, description, safteyDeposit, paySchedule, startDate, endDate) {
        super(userId, name, price, img_ids, description);
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