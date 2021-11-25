const dbConnection = require("./config/mongoConnection");
const events = require("./data/events");
const connection = require("./config/mongoConnection");

const main = async () => {
    const christmasParty = await events.create(
        "christmasParty2k21",
        "party",
        "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "11/05/2021",
        ["11/05/2021", "12:00"],
        ["11/05/2021", "12:00"],
        "3385 rever st",
        "Hoboken",
        "NJ",
        100,
        100,
        "This is the event which is for upcoming event christmas 2k21"
    );
    const diwaliParty = await events.create(
        "diwaliParty2k21",
        "party",
        "8b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "11/05/2021",
        ["11/05/2021", "12:00"],
        ["11/05/2021", "12:00"],
        "232 paterson st",
        "Jersey City",
        "NJ",
        70,
        70,
        "This is the event which is for upcoming event christmas 2k21"
    );

    const thanksgivingParty = await events.update(
        "619ebe734a6d692722350e6e",
        "thanksgivingParty",
        "party",
        "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
        "11/05/2021",
        ["11/05/2021", "12:00"],
        ["11/05/2021", "12:00"],
        "3385 rever st",
        "Hoboken",
        "NJ",
        100,
        100,
        "This is the event which is for upcoming event christmas 2k21"
    );

    const allevents = await events.getAll();
    console.log(allevents);

    const db = await connection();
    await db.serverConfig.close();
};
main();
