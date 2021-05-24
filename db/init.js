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
db.users.insert({ 'username': 'admin', 'password': 'password'});