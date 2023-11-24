import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Produto } from '../../shared/model/produto';
import { ProdutoService } from '../../shared/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  // Inicialize o produtoForm no momento da declaração da propriedade
  produtoForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    dataCompra: ['', Validators.required],
    duracaoGarantiaMeses: ['', Validators.required],
    dataFimGarantia: [{ value: '', disabled: true }],
  });

  // Inicialize o produtoId no momento da declaração da propriedade
  produtoId: number = 0;
  isEditing = false; // Flag para indicar se é uma operação de edição

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Cria o formulário reativo
    this.createForm();
    // Verifica se a operação é uma edição e carrega os detalhes do produto, se necessário
    this.checkEditMode();
  }

  // Cria o formulário reativo usando FormBuilder
  createForm(): void {
    this.produtoForm = this.fb.group({
      id: ['', [Validators.required, this.numberValidator]],
      nome: ['', [Validators.required, this.stringValidator]],
      dataCompra: ['', [Validators.required, this.dateValidator]],
      duracaoGarantiaMeses: ['', [Validators.required, this.numberValidator]],
    });
  }

  // Verifica se a operação é uma edição e carrega os detalhes do produto, se necessário
  checkEditMode(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          this.isEditing = true;
          this.produtoId = +params['id'];
          // Retorna o Observable do produto correspondente ao ID
          return this.produtoService.getProdutoById(this.produtoId);
        } else {
          // Se não houver ID, retorna um Observable vazio
          return [];
        }
      })
    ).subscribe((produto) => {
      // Preenche o formulário com os detalhes do produto se estiver em modo de edição
      if (this.isEditing && produto) {
        this.produtoForm.patchValue(produto);
      }
    });
  }

  // Calcula a data de fim de garantia com base na data de compra e na duração
  calcularDataFimGarantia(): void {
    // Obtém a data de compra e a duração da garantia do formulário
    const dataCompra = this.produtoForm.value.dataCompra;
    const duracaoMeses = this.produtoForm.value.duracaoGarantiaMeses;

    // Verifica se a data de compra e a duração são válidas
    if (dataCompra && duracaoMeses) {
      // Cria uma nova instância da data de compra para não modificar a original
      const dataFimGarantia = new Date(dataCompra);

      // Adiciona a duração da garantia em meses à data de compra
      dataFimGarantia.setMonth(dataFimGarantia.getMonth() + duracaoMeses);

      // Atualiza o valor da data de fim de garantia no formulário
      this.produtoForm.patchValue({ dataFimGarantia });
    }
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    if (isNaN(Number(control.value))) {
      return { invalidNumber: 'Por favor, insira um número válido.' };
    }
    return null;
  }

  stringValidator(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value !== 'string') {
      return { invalidString: 'Por favor, insira um texto válido.' };
    }
    return null;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDate: 'Por favor, insira uma data válida.' };
    }
    return null;
  }

  // Manipula o envio do formulário
  onSubmit(): void {
    const produto: Produto = this.produtoForm.value;

    // Verifica se é uma operação de edição ou adição e realiza a ação apropriada
    if (this.isEditing) {
      produto.id = this.produtoId;
      // Atualiza o produto no serviço
      this.produtoService.updateProduto(produto).subscribe(
        () => {
          // Exibe uma mensagem de sucesso usando MatSnackBar
          this.snackBar.open('Produto atualizado com sucesso', 'Fechar', {
            duration: 2000,
          });
          // Fecha todos os modais abertos usando MatDialog
          this.dialog.closeAll();
        },
        (error) => {
          // Exibe uma mensagem de erro se houver problemas na atualização
          console.error(error);
          this.snackBar.open('Erro ao atualizar o produto', 'Fechar', {
            duration: 2000,
          });
        }
      );
    } else {
      // Adiciona o produto ao serviço
      this.produtoService.addProduto(produto).subscribe(
        () => {
          // Exibe uma mensagem de sucesso usando MatSnackBar
          this.snackBar.open('Produto cadastrado com sucesso', 'Fechar', {
            duration: 2000,
          });
          // Fecha todos os modais abertos usando MatDialog
          this.dialog.closeAll();
        },
        (error) => {
          // Exibe uma mensagem de erro se houver problemas no cadastro
          console.error(error);
          this.snackBar.open('Erro ao cadastrar o produto', 'Fechar', {
            duration: 2000,
          });
        }
      );
    }
  }
}
