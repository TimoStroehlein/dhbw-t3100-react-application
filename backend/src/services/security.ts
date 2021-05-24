const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = (plaintextPassword: string): string => {
    const hash = bcrypt.hashSync(plaintextPassword, saltRounds);
    return hash;
}

export const comparePassword = (plaintextPassword: string, hash: string): boolean => {
    const isMatching = bcrypt.compareSync(plaintextPassword, hash);
    return isMatching;
}