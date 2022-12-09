import { Pilha } from "./pilha";

/*Classe do Jogo Hanoi*/
export class JogoHanoi {
	numerosStick!: number;
	discos!: number;
	sticks!: Pilha[];

	/*Inicialização das variavies */
	constructor(nbSticks: number, discos: number) {
		this.sticks = [];
		this.discos = discos;
		this.numerosStick = nbSticks;

		/*Criação do primeiro stick com o número de discos  */
		const stickInicial = new Pilha();
		for (let i = 0; i < discos; i++) {
			stickInicial.adicionar(i);
		}
		this.sticks.push(stickInicial);

		for (let i = 0; i < nbSticks - 1; i++) {
			this.sticks.push(new Pilha());
		}
	}

	/*Verificar se O jogo foi resolvido*/
	verificarGanho() {
		const ultimaPos = this.sticks.length - 1;
		const ultimoStick = this.sticks[ultimaPos];

		for (let i = 0; i < this.discos; i++) {
			if (ultimoStick.mostrar()[i] !== i) return false;
		}

		return true;
	}

	transicaoEntreStick(apartir: number, para: number) {
		let elemento: number;

		if (this.sticks[apartir].mostrar().length > 0) {
			elemento = this.sticks[apartir].remover()!;
			this.sticks[para].adicionar(elemento!);
		}
	}
}
