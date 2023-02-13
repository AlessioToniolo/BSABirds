// @ts-nocheck
import * as fs from 'fs';

export const prerender = true;
 
/** @type {import('./$types').PageLoad} */
export function load() {
    const csv = fs.readFileSync('static/listOfBirdSpecies.csv', 'utf8');
	let records = [];

	// Manually parse the CSV into the array data while removing carriage returns
	csv.split('\n').forEach((e) => {
		records.push(e.replace('\r', ''));
	});
	for (let i = 0; i < records.length; i++) {
		const temp = records[i].split(',');
		records[i] = temp;
	}

    return {records};
}