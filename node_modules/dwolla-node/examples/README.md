# dwolla-node: NodeJS Dwolla API Examples

## Installation

Before you begin, you'll need to do a couple things:

1. Install the required dependancies by typing:
    
    npm install

2. Drop some API credentials in _config.js. You can generate your credenitals on dwolla.com/applications

    module.exports = {
        apiKey: '',
        apiSecret: '',
        token: '',
        pin: ''
    }
    
## Usage

Simply run the example you want to see operate:

    node balance.js
    node oauth.js
    ...