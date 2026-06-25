import React, { useState, useEffect } from "react";

// Output (No state update):
// 4
// 1
// 2
// 5

// Output (showChild set to false):
// 4
// 3

// Output (Parent unmounts):
// 3
// 6

// COMPLETION TIME: 5 minutes

const Child: React.FC = () => {
	console.log("1. Child: Render");

	useEffect(() => {
		console.log("2. Child: Effect Setup");
		return () => console.log("3. Child: Effect Cleanup");
	}, []);

	return <div>I am the child</div>;
};

export const Parent: React.FC = () => {
	console.log("4. Parent: Render");
	const [showChild, setShowChild] = useState<boolean>(true);

	useEffect(() => {
		console.log("5. Parent: Effect Setup");
		return () => console.log("6. Parent: Effect Cleanup");
	}, []);

	return (
		<div style={{ padding: "20px" }}>
			{showChild && <Child />}
			<button onClick={() => setShowChild(false)}>Unmount Child</button>
		</div>
	);
};

