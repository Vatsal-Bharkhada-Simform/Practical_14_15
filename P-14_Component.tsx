import React, { useState, useEffect } from "react";

// Changes made:
// 1. Moved the fetching logic of useEffect inside a function to prevent infinite loops.
// 2. Used abortController in useFetchData to prevent race conditions.
// 3. Created array from timeframeOptions and derived timeframe type from it.
//    timeframeOptions work as single source of options and type which improves scalability.

// COMPLETION TIME: 20 minutes

// A custom hook meant to be reusable for any fetch request
function useFetchData(url: string, options: RequestInit) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState<boolean>(false);
    
	useEffect(() => {
        const controller = new AbortController();

        function fetchData(){
            setLoading(true);
            fetch(url, {
				...options,
				signal: controller.signal,
			})
				.then((res) => res.json())
				.then((result) => {
					if (!controller.signal.aborted) setData(result);
				})
				.catch((err) => console.error(err))
				.finally(() => {
					if (!controller.signal.aborted) setLoading(false);
				});
        }

        fetchData();
        
        return () => {
            controller.abort();
        }
	}, [url, options]);

	return { data, loading };
}

interface DashboardProps {
	userId: string;
}

const timeframeOptions = ["weekly", "monthly"] as const; // Single source of options as well as types
type TimeframeType = (typeof timeframeOptions)[number];

export const StatsDashboard: React.FC<DashboardProps> = ({ userId }) => {
	const [timeframe, setTimeframe] = useState<TimeframeType>("weekly");

	const { data, loading } = useFetchData(`/api/users/${userId}/stats`, {
		method: "GET",
		headers: {
			"X-Timeframe": timeframe,
		},
	});

	return (
		<div style={{ padding: "20px" }}>
			<h1>User Stats</h1>
			<select
				value={timeframe}
				onChange={(e) =>
					setTimeframe(e.target.value as TimeframeType)
				}
			>
                {
                    timeframeOptions.map(item => <option value={item}>{item[0].toUpperCase() + item.slice(1).toLowerCase()}</option>)
                }
			</select>

			{loading ? (
				<p>Loading...</p>
			) : (
				<pre>{JSON.stringify(data ?? "{}", null, 2)}</pre>
			)}
		</div>
	);
};
