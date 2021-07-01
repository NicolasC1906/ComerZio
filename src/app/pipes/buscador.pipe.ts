import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg == '' || arg.length < 2 ) return value;
    const resultProductos = [];
    for(const product of value) {

      if(product.NombreProducto.toLowerCase().indexOf(arg.toLowerCase()) > -1) {

        // console.log('Hola');
        resultProductos.push(product);

      };

    };
    return resultProductos;
  }

  

}
