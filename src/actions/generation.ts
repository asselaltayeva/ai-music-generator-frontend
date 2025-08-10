"use server"

import { auth } from "~/lib/auth"
import { db } from "~/server/db"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { inngest } from "~/inngest/client";

export default async function queueSong(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect ("/auth/sign-in");


    const song = await db.song.create({
        data: {
            userId: session.user.id,
            title: "Test song1",
            fullDescribedSong: "Hip hop song about a cat",
        },
});

    await inngest.send({
        name: "generate-song-event",
        data: { songId: song.id, userId: song.userId },
    });
}
