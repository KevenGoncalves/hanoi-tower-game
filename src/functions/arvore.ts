import { JogoHanoi } from "./hanoi";
import { Pilha } from "./pilha";

class No {
	caminhos!: Pilha[][];

	constructor(public jogo: JogoHanoi) {
		this.jogo = jogo;
		this.caminhos = [];
	}
}

export class Arvore {
	raiz!: No;

	constructor(jogo: JogoHanoi) {
		this.raiz = new No(jogo);
	}

	buscaPorProfundidade(
		stickInicial: number,
		stickMeio: number,
		stickFinal: number,
		discos: number = this.raiz.jogo.discos
	) {
		if (discos == 0) return;
		if (this.raiz.jogo.verificarGanho()) return;

		this.buscaPorProfundidade(stickInicial, stickFinal, stickMeio, discos - 1);
		this.raiz.jogo.transicaoEntreStick(stickInicial, stickFinal);
		const caminhoString = JSON.stringify(this.raiz.jogo.sticks);
		this.raiz.caminhos.push(JSON.parse(caminhoString));
		this.buscaPorProfundidade(stickMeio, stickInicial, stickFinal, discos - 1);
	}
}
