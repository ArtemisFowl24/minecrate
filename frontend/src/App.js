import "./App.css";
import { render } from "react-dom";

import React, { Component, useEffect, useState } from "react";
import {
	useWallet,
	useConnectedWallet,
	WalletStatus,
} from "@terra-money/wallet-provider";

import * as execute from "./contract/execute";
import * as query from "./contract/query";
import { ConnectWallet } from "./components/ConnectWallet";

function App() {
	const [count, setCount] = useState(null);
	const [updating, setUpdating] = useState(true);
	const [resetValue, setResetValue] = useState(0);

	const { status } = useWallet();

	const connectedWallet = useConnectedWallet();

	useEffect(() => {
		const prefetch = async () => {
			if (connectedWallet) {
				setCount((await query.getCount(connectedWallet)).count);
			}
			setUpdating(false);
		};
		prefetch();
	}, [connectedWallet]);

	const onClickIncrement = async () => {
		setUpdating(true);
		await execute.increment(connectedWallet);
		setCount((await query.getCount(connectedWallet)).count);
		setUpdating(false);
	};

	const onClickReset = async () => {
		setUpdating(true);
		console.log(resetValue);
		await execute.reset(connectedWallet, resetValue);
		setCount((await query.getCount(connectedWallet)).count);
		setUpdating(false);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<div style={{ display: "inline" }}>
					COUNT: {count} {updating ? "(updating . . .)" : ""}
					<button onClick={onClickIncrement} type='button'>
						{" "}
						+{" "}
					</button>
				</div>
				{status === WalletStatus.WALLET_CONNECTED && (
					<div style={{ display: "inline" }}>
						<input
							type='number'
							onChange={e => setResetValue(+e.target.value)}
							value={resetValue}
						/>
						<button
							className='count'
							onClick={onClickReset}
							type='button'>
							{" "}
							resest{" "}
						</button>
					</div>
				)}
				<ConnectWallet />
			</header>
		</div>
	);
}

export default App;
