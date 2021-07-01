import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscadorTiendas'
})
export class BuscadorTiendasPipe implements PipeTransform {


  transform(value: any, arg: any): any {
    if (arg == '' || arg.length < 2 ) return value;
    const resultTiendas = [];
    for(const product of value) {

      if(product.nombreTienda.toLowerCase().indexOf(arg.toLowerCase()) > -1) {

        // console.log('Hola');
        resultTiendas.push(product);

      };

    };
    return resultTiendas;
  }

}
