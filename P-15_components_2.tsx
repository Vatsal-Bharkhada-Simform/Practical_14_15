import React, { useState, useRef, useEffect } from "react";

// Output:
/*
Component rendered. Clicks: 0, Render Count Tracker: 1

###User clicks###

Component rendered. Clicks: 1, Render Count Tracker: 2
Closure state: 0
Mutable Ref: 1
Render count: 2
---
*/

// COMPLETION TIME: 6 minutes 30 seconds

export const MysteryBox: React.FC = () => {
	const [clicks, setClicks] = useState<number>(0);

	const renderCount = useRef<number>(1);
	const latestClicks = useRef<number>(clicks);

	useEffect(() => {
		latestClicks.current = clicks;
	}, [clicks]);

	useEffect(() => {
		latestClicks.current = clicks;
	}, [clicks]);

	const handleHeavyClick = () => {
		setClicks((prev) => prev + 1);

		setTimeout(() => {
			console.log(`Closure State: ${clicks}`);
			console.log(`Mutable Ref: ${latestClicks.current}`);
			console.log(`Render Count: ${renderCount.current}`);
			console.log("---");
		}, 3000);
	};

	console.log(
		`Component rendered. Clicks: ${clicks}, Render Count Tracker: ${renderCount.current}`
	);

	renderCount.current += 1;

	return (
		<div style={{ padding: "20px" }}>
			<button onClick={handleHeavyClick}>Click Me</button>
		</div>
	);
};
