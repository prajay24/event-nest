const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require("mongodb")
const bcrypt = require('bcryptjs');
const saltRounds = 16;


async function createUser(firstName, lastName, phone, gender, email, address, password,){
    if (typeof(firstName) !== 'string'| typeof(lastName) !== 'string'| typeof(email) !== 'string'|typeof(address) !== 'string'| typeof(password) !== 'string'){
        throw '$ input is not string';
    }
    if ( !firstName){
        throw '$ you must supply the user firstName'
    }
    if ( !lastName){
        throw '$ you must supply the lastName'
    }
    if ( !phone){
        throw '$ you must supply the phone'
    }
    if ( !gender){
        throw '$ you must supply the gender'
    }
    if ( !email){
        throw '$ you must supply the email'
    }
    if ( !address){
        throw '$ you must supply the address'
    }
    if ( !password){
        throw '$ you must supply the password'
    }
    if (firstName ==''|typeof firstName == 'undefined' | firstName === null | firstName === NaN){
        throw '$ firstName is empty';
    }
    if (firstName.match(/^[ ]*$/)){
        throw '$ firstName is spaces'
    }
    if (lastName ==''|typeof lastName == 'undefined' | lastName === null | lastName === NaN){
        throw '$ lastName is empty';
    }
    if (lastName.match(/^[ ]*$/)){
        throw '$ lastName is spaces'
    }
    // if (typeof phone != 'string'){
    //     throw '$ phone number must be number'
    // }
    let mypho1 = phone.split('')
    if (mypho1[3] !== '-' || mypho1[7] !== '-'){
        throw '$ phone input is wrong2'
    }
    let mypho = phone.split('-')
    if (mypho[0].length !== 3 || mypho[1].length !== 3 || mypho[2].length !== 4){
        throw '$ phone input is wrong1'
    }
    if (mypho.length != 3){
        throw 'phone input is wrong3'
    }
    let n = Number(mypho[0])
    let n2 = Number(mypho[1])
    let n3 = Number(mypho[2])
    if (isNaN(n) || isNaN(n2) || isNaN(n3)){
        throw '$ phone input is not a number'
    }
    if( gender !== 'male' &&  gender!== 'female' && gender!== 'orther'){
        throw '$ gender must be male ,female or orhter'
    }
    if (email ==''|typeof email == 'undefined' | email === null | email === NaN){
        throw '$ email is empty';
    }
    if (email.match(/^[ ]*$/)){
        throw '$email is spaces'
    }
    let net = email.split('')
    // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
    // throw '$ website is not right'
    if (net.indexOf('@') == -1){
        throw '$ email is not right1'
    }
    // console.log(net[net.length - 1])
    if (net[net.length - 1] !== 'm'|| net[net.length - 2] !== 'o' || net[net.length - 3] !== 'c' || net[net.length - 4] !== '.'){
        throw '$ email is not right2'
    }
    let mya = net.indexOf('@')
    if ((net.length-4) - (mya+1) < 4){
        throw '$ email is not right3'
    }
    let myusmail = email.split('@')
    if (myusmail[0].indexOf(' ')!== -1){
        throw '$ email name have spaces'
    }
    if ((/^[a-z0-9]+$/i).test(myusmail[0]) === false){
        throw '$ email name is not valid'
    }
    if (mya+1 < 5){
        throw '$ email is not right4'
    }
    // addrees check not ready


    if (password ==''|typeof password == 'undefined' | password === null | password === NaN){
        throw '$ password is empty';
    }
    if (password.match(/^[ ]*$/)){
        throw '$ password is spaces'
    }
//to lower case

    const users1 = await users();
    const hash = await bcrypt.hash(password,saltRounds)
    let myaftertestemail = email.split('@')
    myaftertestemail[0] = myaftertestemail[0].toLowerCase()
    let mynewemail = myaftertestemail[0]+'@'+myaftertestemail[1]
    const myusers = await users1.findOne({ email: mynewemail });
    if (myusers !== null) throw 'have users with same email';
    let newusers = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        gender: gender,
        email: mynewemail,
        address: address,
        password: hash,
        URL: {},
        ticket: [],
        eventsfollow: [],
        eventspost: [],
        likeevents: [],
      };

      const insertInfo = await users1.insertOne(newusers);
      if (insertInfo.insertedCount === 0) throw '$ Could not add new restaurants';
  
      const newId = insertInfo.insertedId;
      newusers['_id'] = newusers['_id'].toString()
    //   const dog = await this.getDogById(newId);
      return newusers;

}

async function getAll(){
    const newusers = await users();

    const usersList = await newusers.find({}).toArray();
    // console.log(restaurantsList['_id'])
    for (let i = 0; i < usersList.length; i++){
        let newid = usersList[i]
        newid['_id'] = newid['_id'].toString()
    }

    return usersList;
}

function myDBfunction(id) {
    let { ObjectId } = require('mongodb');
    let parsedId = ObjectId(id)

    if (!id) throw 'Id parameter must be supplied';
  

    if (typeof id !== 'string') throw "Id must be a string";


    console.log('Parsed it correctly, now I can pass parsedId into my query.');
    return parsedId
}

async function checkUsers(email,password){

    if (!email) throw 'You must provide an email to search for get';
    if ( !password){
        throw '$ you must supply the password'
    }
    if (email ==''|typeof email == 'undefined' | email === null | email === NaN){
        throw '$ email is empty';
    }
    if (typeof email == 'string'){
        if (email.match(/^[ ]*$/)){
            throw '$email is spaces'
        }
    }
    let net = email.split('')
    // if (net[0] !== 'h'|| net[1] !== 't' || net[2] !== 't' || net[3] !== 'p' || net[4] !== ':' || net[5] !== '/' || net[6] !== '/' || net[7] !== 'w' || net[8] !== 'w' || net[9] !== 'w' || net[10] !== '.')
    // throw '$ website is not right'
    if (net.indexOf('@') == -1){
        throw '$ email is not right1'
    }
    // console.log(net[net.length - 1])
    if (net[net.length - 1] !== 'm'|| net[net.length - 2] !== 'o' || net[net.length - 3] !== 'c' || net[net.length - 4] !== '.'){
        throw '$ email is not right2'
    }
    let mya = net.indexOf('@')
    if ((net.length-4) - (mya+1)< 4){
        throw '$ email is not right3'
    }
    let myusmail = email.split('@')
    if (myusmail[0].indexOf(' ')!== -1){
        throw '$ email name have spaces'
    }
    if ((/^[a-z0-9]+$/i).test(myusmail[0]) === false){
        throw '$ email name is not valid'
    }
    if (mya+1 < 5){
        throw '$ email is not right4'
    }

    // if(ObjectId.isValid(id)===false){
    //     throw '$ id is not a valid id'
    // }
    let myaftertestemail = email.split('@')
    myaftertestemail[0] = myaftertestemail[0].toLowerCase()
    let mynewemail = myaftertestemail[0]+'@'+myaftertestemail[1]
    
    const users1 = await users();
    const myusers = await users1.findOne({ email: mynewemail });
    if (myusers === null) throw 'No users with that email';
    let compareToMerlin = false
    compareToMerlin = await bcrypt.compare(password, myusers['password']);
    if (compareToMerlin === false){
        throw 'Either the username or password is invalid'
    }
    // console.log(rest['_id'].toString())
    myusers['_id'] = myusers['_id'].toString()

    return myusers;
}

// createUser('Bingzhen','Li','319-429-5274','male','tOny153265964@gmail.com','333 rever st','123456') 
// let my = checkUsers('tony153265964@gmail.com','123456')
// console.log(my)

module.exports = {
    createUser,
    getAll,
    checkUsers,
};
