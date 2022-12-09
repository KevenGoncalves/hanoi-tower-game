/* 
Classe para implmentação de pilha
*/
export class Pilha {
	/* Variavel da pilha baseada em array*/
	private pilha!: number[];

	/*Inicialização da pilha*/
	constructor() {
		this.pilha = [];
	}

	/*Adicionar na Pilha*/
	adicionar(valor: number) {
		this.pilha?.push(valor);
	}

	/*Remover na Pilha*/
	remover() {
		/*Se pilha estiver vazia retornar de imediato*/
		if (this.pilha!.length <= 0) return;
		const elemento = this.pilha.slice(-1);
		this.pilha = this.pilha.slice(0, -1);
		return elemento[0];
	}

	/*Retornar Pilha*/
	mostrar() {
		return this.pilha;
	}
}
