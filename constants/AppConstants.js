require('dotenv').config();

const appTheme={
    primary: "#8ab8ee",
    secondary: "#040404",
    error: "#b61c1c",
    success: "#1a9c5b",
    warning: "#ebce2b",
    logo: "https://genaisuitestorage.blob.core.windows.net/genaisuite/genaisuite-logo.png"
}
module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    API_BASE_URL: process.env.API_BASE_URL,
    DB_ENC: process.env.DB_ENC==="true",
    REQ_RES_ENC: process.env.REQ_RES_ENC==="true",
    EQUAL_USERNAME_EMAIL: process.env.EQUAL_USERNAME_EMAIL==="true",
    AUTH_SECRET: process.env.AUTH_SECRET,
    DB_ENC_KEY: process.env.DB_ENC_KEY,
    REQ_RES_ENC_KEY: process.env.REQ_RES_ENC_KEY,
    APP_DEFAULT_THEME: appTheme,
    SUPER_ADMIN_FIRST_NAME: process.env.SUPER_ADMIN_FIRST_NAME,
    SUPER_ADMIN_LAST_NAME: process.env.SUPER_ADMIN_LAST_NAME,
    SUPER_ADMIN_USERNAME: process.env.SUPER_ADMIN_USERNAME,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
    SUPER_ADMIN_GENDER: process.env.SUPER_ADMIN_GENDER,
}