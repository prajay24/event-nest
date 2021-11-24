const mongoCollections = require("../config/mongoCollections");
const events = mongoCollections.events;
let { ObjectId } = require("mongodb");
var validDate = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
var validTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const getAll = async () => {
    const eventCollection = await events();
    const eventList = await eventCollection.find({}).toArray();

    return eventList;
};
n 
const get = async (id) => {
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "id format wrong";
    }
    if (!id) throw "You must provide an id to search for";
    if (typeof id != "string" || id.trim().length == 0)
        throw "the id provided is not a string or is an empty string";
    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: id1 });

    return event;
};
const create = async (
    title,
    category,
    creator,
    postdate,
    timestart,
    endtime,
    address,
    city,
    state,
    Tickets,
    ticketleft,
    Description
) => {
    if (
        !title ||
        !category ||
        !creator ||
        !postdate ||
        !timestart ||
        !endtime ||
        !address ||
        !city ||
        !state ||
        !Tickets ||
        !ticketleft ||
        !Description
    ) {
        throw "All fields need to have valid values";
    }

    if (
        typeof title != "string" ||
        typeof category != "string" ||
        typeof creator != "string" ||
        typeof postdate != "string" ||
        typeof address != "string" ||
        typeof city != "string" ||
        typeof state != "string" ||
        typeof Description != "string" ||
        title.trim().length == 0 ||
        category.trim().length == 0 ||
        creator.trim().length == 0 ||
        address.trim().length == 0 ||
        city.trim().length == 0 ||
        state.trim().length == 0 ||
        Description.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    if (!postdate.match(validDate)) {
        throw "Date is not in Valid Format";
    }
    if (!Array.isArray(timestart)) {
        throw "timeStart is Not an Array";
    } else if (timestart.length == 0) {
        throw "timeStart is empty";
    } else {
        if (
            typeof timestart[0] != "string" ||
            timestart[0].trim().length == 0 ||
            !timestart[0].match(validDate)
        ) {
            throw " In Timestart you must enter in MM/DD/YY format";
        }
        if (
            typeof timestart[1] != "string" ||
            timestart[1].trim().length == 0 ||
            !timestart[1].match(validTime)
        ) {
            throw " In Timestart you must enter in HH/MM format";
        }
    }

    if (!Array.isArray(endtime)) {
        throw "endtime is Not an Array";
    } else if (endtime.length == 0) {
        throw "endtime is Empty";
    } else {
        if (
            typeof endtime[0] != "string" ||
            endtime[0].trim().length == 0 ||
            !endtime[0].match(validDate)
        ) {
            throw " In Endtime you must enter in MM/DD/YY format";
        }
        if (
            typeof endtime[1] != "string" ||
            endtime[1].trim().length == 0 ||
            !endtime[1].match(validTime)
        ) {
            throw " In Endtime you must enter in HH/MM format";
        }
    }

    if (typeof Tickets != "number" || typeof ticketleft != "number") {
        throw " Number of Tickets must be in Numbers";
    }

    const eventCollection = await events();

    let newevent = {
        title: title,
        category: category,
        creator: creator,
        postdate: postdate,
        timestart: timestart,
        endtime: endtime,
        address: address,
        city: city,
        state: state,
        Tickets: Tickets,
        ticketleft: ticketleft,
        Description: Description,
        buyerList: [],
        followerList: [],
        likeList: [],
    };

    const insertInfo = await eventCollection.insertOne(newevent);

    const newId = insertInfo.insertedId;

    const event = await get(newId.toString());

    return event;
};
const remove = async (id) => {
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "id format wrong";
    }
    if (!id) throw "You must provide an id to search for";
    if (typeof id != "string" || id.trim().length == 0)
        throw "the id provided is not a string or is an  empty string";
    const eventCollection = await events();
    const findEvent = await eventCollection.findOne({ _id: id1 });
    if (findEvent === null) throw "No event Found for this ID";
    await eventCollection.deleteOne({ _id: id1 });
    return `${findEvent.title} has been successfully removed`;
};
const update = async (
    id,
    title,
    category,
    creator,
    postdate,
    timestart,
    endtime,
    address,
    city,
    state,
    Tickets,
    ticketleft,
    Description
) => {
    try {
        id1 = ObjectId(id);
    } catch (e) {
        throw "id format wrong";
    }
    if (!id) throw "You must provide an id to search for";
    if (
        !title ||
        !category ||
        !creator ||
        !postdate ||
        !timestart ||
        !endtime ||
        !address ||
        !city ||
        !state ||
        !Tickets ||
        !ticketleft ||
        !Description
    ) {
        throw "All fields need to have valid values";
    }

    if (
        typeof title != "string" ||
        typeof category != "string" ||
        typeof creator != "string" ||
        typeof postdate != "string" ||
        typeof address != "string" ||
        typeof city != "string" ||
        typeof state != "string" ||
        typeof Description != "string" ||
        title.trim().length == 0 ||
        category.trim().length == 0 ||
        creator.trim().length == 0 ||
        address.trim().length == 0 ||
        city.trim().length == 0 ||
        state.trim().length == 0 ||
        Description.trim().length == 0
    ) {
        throw "parameters are not strings or are empty strings,";
    }

    if (!postdate.match(validDate)) {
        throw "Date is not in Valid Format";
    }
    if (!Array.isArray(timestart)) {
        throw "timeStart is Not an Array";
    } else if (timestart.length == 0) {
        throw "timeStart is empty";
    } else {
        if (
            typeof timestart[0] != "string" ||
            timestart[0].trim().length == 0 ||
            !timestart[0].match(validDate)
        ) {
            throw " In Timestart you must enter in MM/DD/YY format";
        }
        if (
            typeof timestart[1] != "string" ||
            timestart[1].trim().length == 0 ||
            !timestart[1].match(validTime)
        ) {
            throw " In Timestart you must enter in HH/MM format";
        }
    }

    if (!Array.isArray(endtime)) {
        throw "endtime is not an Array";
    } else if (endtime.length == 0) {
        throw "endtime is empty";
    } else {
        if (
            typeof endtime[0] != "string" ||
            endtime[0].trim().length == 0 ||
            !endtime[0].match(validDate)
        ) {
            throw " In Endtime you must enter in MM/DD/YY format";
        }
        if (
            typeof endtime[1] != "string" ||
            endtime[1].trim().length == 0 ||
            !endtime[1].match(validTime)
        ) {
            throw " In Endtime you must enter in HH/MM format";
        }
    }

    if (typeof Tickets != "number" || typeof ticketleft != "number") {
        throw " Number of Tickets must be in Numbers";
    }
    const eventCollection = await events();

    const updatedrest = {
        title: title,
        category: category,
        creator: creator,
        postdate: postdate,
        timestart: timestart,
        endtime: endtime,
        address: address,
        city: city,
        state: state,
        Tickets: Tickets,
        ticketleft: ticketleft,
        Description: Description,
    };
    await eventCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedrest }
    );
    return await get(id);
};
module.exports = {
    create,
    getAll,
    get,
    remove,
    update,
};
