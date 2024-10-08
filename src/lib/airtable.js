const baseId = 'app7gjddwTZzj2Kti';
const airtablePAT =
	'patFI0LLaErSvAWQr.327ca3cbd84a72ee95fef08eca50a78c19c043da66339cabaeca87254675e9a5';

export async function fetchAirtableData(tableId) {
	const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${airtablePAT}`,
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		const data = await response.json();
		return data.records;
	} catch (error) {
		console.error('Error fetching data from Airtable:', error);
		return null;
	}
}

export async function insertAirtableRecord(tableId, fields) {
	const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${airtablePAT}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(fields)
		});

		if (!response.ok) {
			throw new Error(`Failed to insert record: ${response.statusText}`);
		}

		const data = await response.json();
		return data.records[0]; // Return the newly created record
	} catch (error) {
		console.error('Error inserting record into Airtable:', error);
		return null;
	}
}
