import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
	env: {
		imageKit: { publicKey, privateKey, urlEndpoint },
	},
} = config;

const imageKit = new ImageKit({
	publicKey,
	urlEndpoint,
	privateKey,
});

export async function GET() {
    return NextResponse.json(imageKit.getAuthenticationParameters())
}
