import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { ProdutoService } from '../../shared/services/produto.service';
import { Produto } from '../../shared/model/produto';
import { MatDialog } from '@angular/material/dialog';
import { CadastroComponent } from '../cadastro/cadastro.component';

// Decorador do componente Angular
@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  // Fonte de dados para a tabela, inicializada como uma nova instância de MatTableDataSource
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<Produto>();

  // Colunas exibidas na tabela
  displayedColumns: string[] = ['id', 'nome', 'dataCompra', 'duracaoGarantiaMeses', 'dataFimGarantia', 'options'];

  // Referências para os elementos MatSort e MatPaginator usando ViewChild
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), this.cdr);

  // Injeção do serviço de produtos e do Router no construtor
  constructor(private produtoService: ProdutoService, private cdr: ChangeDetectorRef, private router: Router, private dialog: MatDialog) { }

  // Método chamado ao iniciar o componente
  ngOnInit(): void {
    // Carrega os produtos ao iniciar o componente
    this.carregarProdutos();
  }

  // Método para carregar os produtos do serviço e configurar a fonte de dados da tabela
  carregarProdutos(): void {
    // Chama o serviço para obter a lista de produtos
    this.produtoService.getProdutos().subscribe((produtos) => {
      // Cria uma fonte de dados para a tabela com a lista de produtos obtida
      this.dataSource = new MatTableDataSource(produtos);

      // Configura a ordenação e paginação da tabela
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // Método para aplicar um filtro à tabela com base no valor de entrada
  aplicarFiltro(event: Event): void {
    // Obtém o valor do filtro do elemento de entrada do evento
    const filtro = (event.target as HTMLInputElement).value;

    // Aplica o filtro à fonte de dados da tabela, convertendo para minúsculas
    this.dataSource.filter = filtro.trim().toLowerCase();

    // Reinicia a página do paginator para a primeira página
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para navegar para a página de edição com base no ID do produto
  editarProduto(id: number): void {
    this.router.navigate(['editar', id]);
  }

  // Método para remover um produto com base no ID do produto
  removerProduto(id: number): void {
    // Chama o serviço para remover o produto com base no ID
    this.produtoService.deleteProduto(id).subscribe(() => {
      // Atualiza a lista após a remoção
      this.carregarProdutos();
    });
  }

  // AbrirPopup(id: any) {
  //   const _popup = this.dialog.open(CadastroComponent, {
  //     width: '500px',
  //     exitAnimationDuration: '1000ms',
  //     enterAnimationDuration: '1000ms',
  //     data: {
  //       id: id
  //     }
  //   })
  //   _popup.afterClosed().subscribe(r => {
  //     this.carregarProdutos();
  //   });
  // }

  // EditarProduto(id: any) {
  //   this.AbrirPopup(id);
  // }
}

