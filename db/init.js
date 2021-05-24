db.createUser({
    user: 'dev',
    pwd: 'dev',
    roles: [
        {
        role: 'readWrite',
        db: 'dhbw-t3100-react-application'
        }
    ]
});

db.createCollection('users', { capped: false });
db.users.insert({ 'username': 'admin', 'password': '$2y$10$nCwnDm1SjKbw9A8Axawne.ba4heGTgmM5zPkIhdZe.POsUq4/cTky'});