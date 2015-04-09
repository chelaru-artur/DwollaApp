
module.exports = {
    app : {
        sendMoney : 0.10,
        //In what interval to check email for new messages
        minutes : 1,
        forbidPaymentToSameEmails : true
    },
    // Client ID and client secret are available at
    // https://code.google.com/apis/console
    gmail : {
        CLIENT_ID :'1026252550688-8e6mv0inohl5j7cgs6fs78rakn54r5bp.apps.googleusercontent.com' ,
        CLIENT_SECRET : 'OBKwp9AlRng1Mo9aZ8wBFYnP',
        REDIRECT_URL : 'http://127.0.0.1:1337/gmail'

    },
    dwolla :  {
        API_KEY: 'S/dk5JgA32FCkb6x8gXKjghjrbwAgGiEGtkie7lnfCBD07m1w6',
        API_SECRET: 'RhBC6YVYo5QmWtesIhO5mXN7h7Jtdx5huR6Q5nfyAbvxShYvoX',
        PIN: '1111',
        REDIRECT_URL : 'http://127.0.0.1:1337/dwolla'
    }
}
