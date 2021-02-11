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