import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return { userId: userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({
        image: {
            maxFileSize: "1MB",
            maxFileCount: 1,
        },
    }).middleware(() => handleAuth()).onUploadComplete(() => {
        return { message: "File uploaded successfully" };
    }),
    messageFile: f(["image", "pdf"]).middleware(() => handleAuth()).onUploadComplete(() => {
        return { message: "File uploaded successfully" };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;