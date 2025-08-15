import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { db } from "~/server/db";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
 
const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: 'sandbox'
});
 
export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql", 
    }),
    emailAndPassword: {
        enabled: true, 
      }, 
      plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "2b7f3e96-6dbf-4792-9ff2-515f0dfad73b", 
                            slug: "small" 
                        },
                        {
                            productId: "81e68d7c-ebdb-4fe3-af23-aefe63e6e6ff", 
                            slug: "medium" 
                        },
                        {
                            productId: "43c986c1-d0cd-4782-bcd8-f740c016ea60", 
                            slug: "large" 
                        }
                    ],
                    successUrl: "/",
                    authenticatedUsersOnly: true
                }),
                portal(),
                webhooks({
                    secret: env.POLAR_WEBHOOK_SECRET,
                    onOrderPaid: async (order) => {
                        const externalCustomerId = order.data.customer.externalId;
                        if (!externalCustomerId) {
                            console.error("No external customer ID found in order data");
                            throw new Error("No external customer ID found in order data");
                        }

                        const productId = order.data.productId;
                        let creditToAdd = 0;

                        switch (productId) {
                            case "2b7f3e96-6dbf-4792-9ff2-515f0dfad73b": // small
                                creditToAdd = 10;
                                break;
                            case "81e68d7c-ebdb-4fe3-af23-aefe63e6e6ff": // medium
                                creditToAdd = 25;
                                break;
                            case "43c986c1-d0cd-4782-bcd8-f740c016ea60": // large
                                creditToAdd = 50;
                                break;
                        }

                        await db.user.update({
                            where: { id: externalCustomerId },
                            data:{
                                credits: {
                                    increment: creditToAdd
                                }
                            }
                        })
                    }
                })
            ],
        })
    ]
});