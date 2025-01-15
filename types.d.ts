interface Book {
	id: number;
	title: string;
	author: string;
	genre: string;
	rating: number;
	totalCopies: number;
	availableCopies: number;
	description: string;
	coverColor: string;
	cover: string;
	video: string;
	summary: string;
	isLoanedBook?: boolean;
}

interface AuthCredentials {
	email: string;
	password: string;
	fullName: string;
	universityId: number;
	universityCard: string;
}

interface BookParams {
	title: string;
	author: string;
	genre: string;
	rating: number;
	coverUrl: string;
	coverColor: string;
	description: string;
	totalCopies: number;
	videoUrl: string;
	summary: string;
}
