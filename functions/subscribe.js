const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method not allowed" }),
            headers: { "Allow": "POST" },
        };
    }

    let data;
    try {
        data = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid JSON" }),
        }
    };

    const { email } = data;

    if (!email || !isValidEmail(email)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid or missing email" }),
        };
    }

    try {
        const subscriberRef = db.collection("subscribers").doc(email.toLowerCase());
        await subscriberRef.set({
            email: email.toLowerCase(),
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            source: "coffpact.com",
            status: "active",
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Subscribed successfully" }),
        };
    } catch (error) {
        console.error("Firestone error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save subscriber "})
        };
    }
};