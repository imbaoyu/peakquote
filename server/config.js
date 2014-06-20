path = require('path');

module.exports = {
  security: {
    usersCollection: [
			{
				id: '1',
				email: 'Arthur.Dent@earth.com',
				password: '42',
				firstName: 'Arthur',
				lastName: 'Dent',
				admin: false
			},
			{
				id: '2',
				email: 'Zaphod.Beeblebrox@galaxy.com',
				password: '42',
				firstName: 'Zaphod',
				lastName: 'Beeblebrox',
				admin: true
			},
			{
				id: '3',
				email: 'Ford.Prefect@galaxy.com',
				password: '42',
				firstName: 'Ford',
				lastName: 'Prefect',
				admin: false
			},
			{
				id: '4',
				email: 'Trillian.Astra@earth.com',
				password: '42',
				firstName: 'Trillian',
				lastName: 'Astra',
				admin: false
			},
		]				                            		// The name of the collection contains user information
  },
  server: {
    listenPort: 3000,                                   		// The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433,                                   		// The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    distFolder: path.resolve(__dirname, '../client/app'),   // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    staticUrl: '/static',                               		// The base url from which we serve static files (such as js, css and images)
    cookieSecret: 'peaksolar'                         			// The secret for encrypting the cookie
  }
};
