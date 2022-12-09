import { JogoHanoi } from "./functions/hanoi";
import { Arvore } from "./functions/arvore";
import { atom, useAtom } from "jotai";
import { Pilha } from "./functions/pilha";
import { useCallback, useEffect, useState } from "react";

const rods = 3;
const discos = atom(5);

function Stick({
	stick,
	pos,
	discs,
	handleChange,
}: {
	stick: Pilha;
	pos: number;
	discs: number;
	handleChange: (stack: number) => void;
}) {
	return (
		<button onClick={() => handleChange(pos)} className="flex justify-center items-end">
			<div className="h-52 bg-red-600 w-4 rounded-t-md" />
			<div className="absolute flex flex-col-reverse items-center gap-1 mb-1">
				{/* Field */}
				{stick.mostrar().map((disc, index) => (
					<div
						key={index + "-" + disc}
						className="h-5 bg-blue-500 text-white rounded-md"
						style={{ width: discs + 1 - disc + "rem" }}
					>
						{disc}
					</div>
				))}
			</div>
		</button>
	);
}

function Hanoi({ jogo, discs, setOld }: { jogo: JogoHanoi; discs: number; setOld: any }) {
	const [change, setChange] = useState<number[]>([]);

	const handleChange = useCallback(
		(stack: number) => {
			setChange((state) => [...state, stack]);
		},
		[change]
	);

	useEffect(() => {
		if (change.length > 1) {
			jogo.transicaoEntreStick(change[0], change[1]);
			const caminhoString = JSON.stringify(jogo.sticks);
			setOld((old: any) => [...old, caminhoString]);
			setChange(() => []);
		}
	}, [change]);

	return (
		<div>
			<div className="grid grid-cols-3 gap-2">
				{jogo.sticks.map((stick, index) => (
					<Stick pos={index} handleChange={handleChange} discs={discs} key={index} stick={stick} />
				))}
			</div>
			<div className="h-4 bg-black " style={{ width: 120 * rods }} />
		</div>
	);
}

function Caminhos({ dis, caminhos }: { caminhos: any; dis: number }) {
	return (
		<div className="flex flex-col gap-2">
			<span className="font-semibold text-4xl py-4">Número de Passos:&nbsp;{caminhos.length}</span>
			{caminhos.map((hanoi: any) => (
				<div>
					<div className="grid grid-cols-3 gap-2 w-96">
						{hanoi.map((stick: any) => (
							<button className="flex justify-center items-end">
								<div className="h-52 bg-red-600 w-4 rounded-t-md" />
								<div className="absolute flex flex-col-reverse items-center gap-1 mb-1">
									{stick.pilha.map((disc: number, index: number) => (
										<div
											key={index + "-" + disc}
											className="h-5 bg-blue-500 text-white rounded-md"
											style={{ width: dis + 1 - disc + "rem" }}
										>
											{disc}
										</div>
									))}
								</div>
							</button>
						))}
					</div>
					<div className="h-4 bg-black " style={{ width: 120 * rods }} />
				</div>
			))}
		</div>
	);
}

function App() {
	const [state, setState] = useState(false);
	const [discs, updateDiscos] = useAtom(discos);
	const [jogo, setJogo] = useState(new JogoHanoi(rods, discs));
	const [old, setOld] = useState<any[]>([JSON.stringify(jogo.sticks)]);

	const handleShow = () => {
		setState(false);

		const oldCaminhos = old
			.sort()
			.reverse()
			.map((cam) => JSON.parse(cam));

		const oldTree = new Arvore(new JogoHanoi(rods, discs));
		oldTree.buscaPorProfundidade(0, 1, 2);
		setOld(() => [...oldCaminhos, ...oldTree.raiz.caminhos]);

		setTimeout(() => {
			setState(true);
		}, 50);
	};

	const handleMais = () => {
		setState(false);
		updateDiscos((numb) => numb + 1);
	};

	const handleMenos = () => {
		setState(false);
		updateDiscos((numb) => numb - 1);
	};

	useEffect(() => {
		setJogo(new JogoHanoi(rods, discs));
	}, [discs]);

	useEffect(() => {
		setOld(() => [JSON.stringify(jogo.sticks)]);
	}, [jogo]);

	return (
		<div className="flex w-full h-screen">
			<div className="w-1/2 h-screen flex items-center justify-center flex-col gap-10 ">
				<button onClick={handleShow} className="p-3 bg-red-600 text-white rounded">
					Mostrar
				</button>
				<div className="flex gap-4 items-center">
					<button onClick={handleMais} className="p-3 bg-red-600 text-white rounded">
						+
					</button>
					{discs}
					<button onClick={handleMenos} className="p-3 bg-red-600 text-white rounded">
						-
					</button>
				</div>
				<Hanoi setOld={setOld} jogo={jogo} discs={discs} />
			</div>
			<div className="w-full flex justify-center">{state ? <Caminhos dis={discs} caminhos={old} /> : null}</div>
		</div>
	);
}

export default App;
