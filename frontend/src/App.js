import logo from "./logo.svg";
import "./App.css";
import React, { Component, useEffect, useState } from "react";
import { LCDClient, MsgSend, MnemonicKey } from "@terra-money/terra.js";
import ItemList from "./components/ItemList";
import Item from "./components/Item";

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
		<div className='doc'>
			<>
				<h1
					className='title'
					style={{
						fontSize: "60px",
						display: "flex",
						justifyContent: "center",
						fontFamily: "Verdana",
						color: "BLACK",
						paddingTop: "20px",
					}}>
					MineCrate
				</h1>
				<ItemList
					title='Items'
					items={[
						<Item
							url='https://i.pinimg.com/474x/80/eb/a5/80eba5879774c307804cc69de3c8b1f7.jpg'
							name='Light Pickaxe'
							price='0.2 Luna '
							date='Jan 5, 2022'
							author='alex343'
						/>,

						<Item
							url='https://lh3.googleusercontent.com/-_j6dPPMX0J2_C1WWZNaykmwjDz5_lwtDpnAFvJCmZlxSkB4mWSYitUepg9eOSJLZc4dy09oo7OtUtnYtlD9VgbvLwIuG1cW0VhE=s400'
							name='Nova Axe'
							price='0.1 Luna '
							date='Jan 7, 2020'
							author='hakim45'
						/>,

						<Item
							url='https://lh3.googleusercontent.com/t3ba1p1xKmb4CqUBrHegbVsSlZLSsduksPmUnx21aZcJKnMq1RGIclKwZjsFcdQtSQnGDl7lQyHhdishBw3ItA'
							name='Ice Sword'
							price='0.05 Luna '
							date='Dec 26, 2020'
							author='om976'
						/>,

						<Item
							url='https://www.tynker.com/minecraft/api/item?id=5c8e5e3a70b0027f317f69f9&w=400&h=400&width=400&height=400&mode=contain&format=jpg&quality=75&cache=max&v=1552834311'
							name='The Forgotten'
							price='0.1 Luna '
							date='Mar 5, 2019'
							author='haneef453'
						/>,
					]}
				/>
				<ItemList
					title='Structures'
					items={[
						<Item
							url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcs2.worldofmods.com%2Fscreenshots%2Ff80ce%2F2015-06%2Foriginal%2F936b577119fea29ddbf0c95688c00556d4650912%2F158284-javaw-2015-06-26-15-11-07-14.jpg&f=1&nofb=1&w=400&h=400&width=400&height=400'
							name='Hot Air Baloon'
							price='2 Luna '
							date='Jan 5, 2022'
							author='alex343'
						/>,

						<Item
							url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.planetminecraft.com%2Ffiles%2Fimage%2Fminecraft%2Fproject%2F2021%2F267%2F13848886_xl.jpg&f=1&nofb=10&w=400&h=400&width=400&height=400'
							name='Shinganshina District'
							price='20 Luna '
							date='Jan 7, 2020'
							author='hakim45'
						/>,

						<Item
							url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.winudf.com%2Fv2%2Fimage%2FY29tLmFtcGVyYW1pbmlzdHVkaW8uTWluZWNyYWZ0Q2FzdGxlX3NjcmVlbl8wXzl3OHhoMHdk%2Fscreen-0.jpg%3Fh%3D800%26fakeurl%3D1%26type%3D.jpg&f=1&nofb=1'
							name='Cool Castle'
							price='15 Luna '
							date='Dec 26, 2020'
							author='om976'
						/>,

						<Item
							url='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.planetminecraft.com%2Ffiles%2Fresource_media%2Fscreenshot%2F1238%2F2012-09-22_000653_3650402.jpg&f=1&nofb=1'
							name='Minecraft Rollercoaster'
							price='0.5 Luna '
							date='Mar 5, 2019'
							author='haneef453'
						/>,
					]}
				/>
				<ItemList
					title='Skins'
					items={[
						<Item
							url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NQEP26RC12JRq-in14vWAwHaLH%26pid%3DApi&f=1'
							name='Green Lantern'
							price='0.01 Luna '
							date='Jan 5, 2022'
							author='alex343'
						/>,

						<Item
							url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.x_cRoS253tIfRQ49ZYwHOAHaHa%26pid%3DApi&f=1'
							name='Whaaaaa???? #awesome'
							price='0.02 Luna '
							date='Jan 7, 2020'
							author='hakim45'
						/>,

						<Item
							url='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpreview.redd.it%2Fwic1kfoywpj51.jpg%3Fauto%3Dwebp%26s%3D2ec15ce3eb1209b4f6ee565032fbf7c2c2a7e96a&f=1&nofb=1'
							name='Funny Fox'
							price='0.015 Luna '
							date='Dec 26, 2020'
							author='om976'
						/>,

						<Item
							url='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fprogramminglibrarian.org%2Fsites%2Fdefault%2Ffiles%2Fminecraft_zombie.jpg&f=1&nofb=1'
							name='Minecraft Zombie Skin'
							price='0.025 Luna '
							date='Mar 5, 2019'
							author='haneef453'
						/>,
					]}
				/>
			</>
		</div>
	);
}

export default App;
