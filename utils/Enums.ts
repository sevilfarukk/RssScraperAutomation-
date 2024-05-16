export enum emptyFieldsErrorMessages {
    EMPTY_USERNAME = 'Required. 30 characters or fewer. Letters, digits and @/./+/-/_ only.',
    EMPTY_PASSWORD = 'This field is required.',
    EMPTY_PASSWORDCONFIRMATION = 'This field is required.',
    VALID_USERNAME = 'Enter a valid username. This value may contain only letters, numbers and @/./+/-/_ characters.',
    PASSWORD_SHORT = 'This password is too short. It must contain at least 8 characters.',
    PASSWORD_COMMON = 'This password is too common.'
}

export enum userExist {
    USER_EXIST = 'A user with that username already exists.'
}

export enum accountCredientials {
    USERNAME = 'test123_',
    PASSWORD = '4567TEST',
    PASSWORD_CONFIRMATION = '4567TEST',
    USERNAME_NOT_MATCH = 'test123*',
    PASSWORD_TOO_SHORT = 'ztyl-1',
    PASSWORD_COMMON = '12345678',
}

export enum newFeedURL {
    NEW_FEED = 'https://www.yahoo.com/news/rss'
}