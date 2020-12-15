print('Start #################################################################');

db = db.getSiblingDB('messages_db')


db.createUser(
    {
        user: "qlik",
        pwd: "secret",
        roles: [
            {
                role: "readWrite",
                db: "messages_db"
            }
        ]
    }
);

print('END #################################################################');