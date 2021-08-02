const app = require('./app');
const dotenv = require('dotenv');

//Setting config dile 
dotenv.config({
    path : process.env.NODE_ENV === 'TEST' ? 'backend/config/test.env' : 'backend/config/config.env'
});

app.listen(process.env.PORT, () => {
    console.log(
        `Server running in PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    ) 
})