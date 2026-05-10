exports.handler = async function(event) {
    const API_KEY = event.queryStringParameters.userKey || process.env.YOUTUBE_KEY;
    const params = new URLSearchParams(event.queryStringParameters);
    params.set('key', API_KEY);

    const endpoint = event.queryStringParameters.endpoint;
    params.delete('endpoint');

    const urls = {
        commentThreads: 'https://www.googleapis.com/youtube/v3/commentThreads',
        comments: 'https://www.googleapis.com/youtube/v3/comments',
        videos: 'https://www.googleapis.com/youtube/v3/videos'
    };

    const baseUrl = urls[endpoint];
    if (!baseUrl) {
        return { statusCode: 400, body: JSON.stringify({ error: 'invalid endpoint' }) };
    }

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.json();

    return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
};