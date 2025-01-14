"use client";

import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const {
	env: {
		imageKit: { publicKey, urlEndpoint },
	},
} = config;

const authenticator = async () => {
	try {
		const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Request failed with status: ${response.status}: ${errorText}`
			);
		}

		const data = await response.json();
		const { token, expire, signature } = data;

		return { token, expire, signature };
	} catch (error: any) {
		throw new Error(`Failed to authenticate: ${error.message}`);
	}
};

const ImageUpload = ({
	onFileChange,
}: {
	onFileChange: (filePath: string) => void;
}) => {
	const iKUploadRef = useRef(null);
	const [file, setFile] = useState<{ filePath: string } | null>(null);

	const { toast } = useToast();

	const onError = (error: any) => {
		console.log(error);

		toast({
			title: "Image upload failed",
			description: "Your image could not be uploaded. Please try again.",
			variant: "destructive",
		});
	};

	const onSuccess = (res: any) => {
		setFile(res);
		onFileChange(res.filePath);

		toast({
			title: "Image uploaded successfully",
			description: `${res.filePath} uploaded successfully!`,
		});
	};

	return (
		<ImageKitProvider
			publicKey={publicKey}
			urlEndpoint={urlEndpoint}
			authenticator={authenticator}>
			<IKUpload
				className="hidden"
				ref={iKUploadRef}
				onError={onError}
				onSuccess={onSuccess}
				fileName="test-upload.png"
			/>

			<button
				className="upload-btn"
				onClick={(e) => {
					e.preventDefault();
					if (iKUploadRef.current) {
						// @ts-ignore
						iKUploadRef.current?.click();
					}
				}}>
				<Image
					src="/icons/upload.svg"
					alt="Upload"
					width={20}
					height={20}
					className="object-contain"
				/>
				<p className="text-base text-light-100">Upload a File</p>
				{file && <p className="upload-filename">{file.filePath}</p>}
			</button>

			{file && (
				<IKImage
					alt={file.filePath}
					path={file.filePath}
					width={500}
					height={300}
				/>
			)}
		</ImageKitProvider>
	);
};

export default ImageUpload;
