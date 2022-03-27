import {
	LCDClient,
	MsgExecuteContract,
	Fee,
	MsgSend,
	MnemonicKey,
} from "@terra-money/terra.js";
import { contractAdress } from "./address";

// ==== utils ====

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const until = Date.now() + 1000 * 60 * 60;
const untilInterval = Date.now() + 1000 * 60;

const _exec = (
	msg,
	fee = new Fee(200000, { uluna: 10000 })
) => async wallet => {
	const lcd = new LCDClient({
		URL: wallet.network.lcd,
		chainID: wallet.network.chainID,
	});

	const mk = new MnemonicKey({
		mnemonic:
			"notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius",
	});

	// a wallet can be created out of any key
	// wallets abstract transaction building
	const W = lcd.wallet(mk);

	// create a simple message that moves coin balances
	const send = new MsgSend(
		"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8",
		"terra1mqssd6267awmhf89vqd6h8ek0gkt7m6mkr9lxw",
		{ uluna: 1000000 }
	);

	W.createAndSignTx({
		msgs: [send],
		memo: "test from terra.js!",
	})
		.then(tx => lcd.tx.broadcast(tx))
		.then(result => {
			console.log(`TX hash: ${result.txhash}`);
		});

	const { result } = await wallet.post({
		fee,
		msgs: [
			new MsgExecuteContract(
				wallet.walletAddress,
				contractAdress(wallet),
				msg
			),
			send,
		],
	});

	while (true) {
		try {
			return await lcd.tx.txInfo(result.txhash);
		} catch (e) {
			if (Date.now() < untilInterval) {
				await sleep(500);
			} else if (Date.now() < until) {
				await sleep(1000 * 10);
			} else {
				throw new Error(
					`Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`
				);
			}
		}
	}
};

// ==== execute contract ====

export const increment = _exec({ increment: {} });

export const reset = async (wallet, count) =>
	_exec({ reset: { count } })(wallet);
