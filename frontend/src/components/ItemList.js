import Item from "./Item";
import React, { Component, useEffect, useState } from "react";

export default function ItemList(props) {
	return (
		<div>
			<h1 style={{ paddingLeft: "40px" }}>{props.title}</h1>

			<div
				class='ui link cards'
				style={{
					display: "flex",
					justifyContent: "space-between",
					paddingLeft: "40px",
					paddingBottom: "25px",
				}}>
				{props.items}
			</div>
		</div>
	);
}
