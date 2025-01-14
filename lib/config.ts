const config = {
	env: {
		imageKit: {
			publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
			urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
			privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
		},
		apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
	},
};

export default config;