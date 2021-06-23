var redis = require("redis");
var client = redis.createClient();

client.on("connect", function () {
    console.log("Redis Connection Successful!!");
});

exports.home = async (req, res) => {

    client.get('counterBlue', (err, blue) => {
        client.get('counterRed', (err, red) => {
            client.get('counterYellow', (err, yellow) => {
                client.get('counterGrey', (err, grey) => {

                    counter = {
                        red: red,
                        blue: blue,
                        yellow: yellow,
                        grey: grey
                    }
                    res.render('home' , { counter : counter})

                })

            })

        })

    })
   
}