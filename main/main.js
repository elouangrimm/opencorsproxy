exports.handler = async function(event) {
    const url = event.queryStringParameters.url;
    const type = event.queryStringParameters.type || "html";

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'url' query parameter" }),
        };
    }

    try {
        const response = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        let contentType = "text/html";
        let body;

        if (type === "json") {
            body = JSON.stringify(await response.json());
            contentType = "application/json";
        } else if (type === "text") {
            body = await response.text();
            contentType = "text/plain";
        } else { 
            body = await response.text();
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": contentType,
            },
            body: body,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};