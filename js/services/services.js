export const postData = async (url, decsreption) => {
	const res = await fetch(url, {
		method: 'POST',
		body: decsreption,
		headers: {'content-type': 'application/json'},
	});

	return await res.json();
};

export const getData = async (url) => {
	const res = await fetch(url);
	if(!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`);
	return await res.json();
};
