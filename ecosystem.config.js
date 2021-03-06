module.exports = {
	apps: [
		{
			name: 'mappslab-api',
			script: 'yarn start:api',
			time: true,
			instances: 1,
			autorestart: true,
			max_restarts: 50,
			watch: false,
			max_memory_restart: '1G',
			env: {
				PORT: 3000,
				DEBUG: 'api,db',
				JWT_KEY: process.env.JWT_KEY,
				DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
				AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
				AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
				AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
			},
		},
	],
	deploy: {
		staging: {
			user: 'mappy',
			host: '165.232.50.103',
			key: 'deploy.key',
			ref: 'origin/main',
			ssh_options: 'StrictHostKeyChecking=no',
			repo: 'https://github.com/MappsLab/mappslab',
			path: '/home/mappy/mappslab',
			'post-deploy':
				'yarn install && yarn build && pm2 reload ecosystem.config.js --env staging && pm2 save && git checkout yarn.lock',
			env: {
				NODE_ENV: 'staging',
				JWT_KEY: process.env.JWT_KEY,
				DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
				AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
				AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
				AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
			},
		},
	},
}
