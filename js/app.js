
let opcion;
// Presenta el menú inicial paraq ue el usuario seleccione que funcionalidad desea utilizar

opcion = parseInt(prompt('Bienvenid@ a la sección de cálculos saludables' + '\n \n' +
    'Seleccione la tarea que desea realizar: ' + '\n \n' +
    '-> 1: Índice de masa corporal (IMS)' + '\n \n' +
    '-> 2: Reporte alimenticio de su Receta' + '\n \n' +
    '-> 3: Salir' + '\n \n ' +
    'IMPORTANTE: habilitar la consola para visualizar los resultados. ' + '\n '));

switch (opcion) {

    case 1:
        imc();
        break;
    case 2:
        reporteAlimenticio();
        alert('Muchas gracias por su visita, los resultados se pueden ver por consola');
        break;
    case 3:
        alert('Muchas gracias por su visita');
        break;
    default:
        break;
}


// se utiliza en el caso que en menú ppial seleccione la opción 1 de IMC - Índice de Masa corporal.
// (peso)/(estatura * estatura)

function imc() {

    let estatura = '';
    let peso = '';
    let imc = 0;

    // se solicitan los datos para el cálculo

    estatura = prompt('--> Ingrese su estatura en Metros: (Ej. 1.74) ');
    peso = prompt('--> Ingrese su peso en Kgr: (Ej. 85.3)');

    // solo valida el ingreso de valores numéricos con coma

    while (estatura.includes(',') || peso.includes(',')) {

        alert('Recuerde que el seprador de decimales debe ser un punto "." ')
        estatura = prompt('--> Ingrese su estatura en Metros: ');
        peso = prompt('--> Ingrese su peso en Kgr: ');

    }

    // parsefloat convierte a número real 
    // la función Math.pow (a,b) eleva "a" a la potencia "b"
    // la función Math.round() retorna el valor de un número redondeado al entero más cercano.

    imc = parseFloat(peso) / Math.pow(estatura, 2);

    alert('Con una altura de ' + estatura + ' y un peso de ' + peso + '\n' +
        ' Su índice de Masa Corporal es de :  ' + Math.round(imc) + '\n \n ' +
        '-----------------------------------------------' + '\n' +
        '                     Tabla de IMC                    ' + '\n' +
        '-----------------------------------------------' + '\n' +
        '       IMC                        ESTADO              ' + '\n' +
        'Por debajo de 18.5      Bajo peso            ' + '\n' +
        '    18,5–24,9                  Peso normal           ' + '\n' +
        '    25.0–29.9                  Pre-obesidad o Sobrepeso  ' + '\n' +
        '    30.0–34.9                  Obesidad clase I        ' + '\n' +
        '    35,0–39,9                  Obesidad clase II       ' + '\n' +
        ' Por encima de 40       Obesidad clase III      ' + '\n')

}

// permite el ingreso de las listas de Alimentos y bebidas

function reporteAlimenticio() {

    // campos que se utiliza en estructuras de control
    let tipo = "";

    // si es Alimento toma el valor gramo sino mililitro
    let unidades = "";

    // ítems de alimento y bebida
    let alimento;
    let bebida;

    //atributos de los ítems
    let nombre = "";
    let precio = 0;
    let cantidad = 0;
    let calorias = 0;
    let sodio = 0;
    let grasas = 0;

    //listas de ítems de bebidas y alimentos
    let receta = [];
    let bodega = [];


    do {
        console.log('Ingresando un nuevo ítem de la Receta...');
        tipo = prompt('--> Nombre el tipo de producto -> A: Alimento B: Bebida : ').toUpperCase();


        while (tipo != 'A' && tipo != 'B') {
            alert('Recuerde que las opciones pueden ser A o B ');
            tipo = prompt('--> Nombre el tipo de producto -> A: Alimento B: Bebida : ').toUpperCase();
        }

        // Ingreso de campo nombre del ítem    
        if (tipo == 'A') {
            nombre = prompt('--> Nombre del Alimento: ');
            unidades = 'gramos';
        } else {
            nombre = prompt('--> Nombre de la Bebida: ');
            unidades = 'mililitros';
        }



        // ingreso del resto de los campos tener en cuenta el cambio de unidad si se agregan/modifican campos

        console.log('------------------------------------------------------------------------------------------');
        console.log('IMPORTANTE: para las cantidades recuerde ingresar las mismas en relación a cada 100 ' + unidades + ': ');
        console.log('------------------------------------------------------------------------------------------');

        precio = parseFloat(prompt('--> Precio del item: '));
        cantidad = parseInt(prompt('--> Cantidad en ' + unidades + ': '));
        calorias = parseInt(prompt('--> Calorías cada 100 ' + unidades + ': '));
        sodio = parseInt(prompt('--> Sodio cada 100 ' + unidades + ': '));
        grasas = parseInt(prompt('--> Grasas cada 100 ' + unidades + ': '));

        // almacena el item en la lista que le corresponde

        if (tipo == 'A') {
            alimento = [nombre, precio, cantidad, calorias, sodio, grasas];
            receta.push(alimento)
        } else {
            bebida = [nombre, precio, cantidad, calorias, sodio, grasas];
            bodega.push(bebida)
        }

        continuar = prompt('** Desea agregar otro item en el carrito de compras? si/no **').toUpperCase();

    } while (continuar == 'SI' || continuar == 'S' || continuar == 'SÍ');


    // presenta por consola la tabla de alimentos 

    if (receta.length > 0) {
        console.log('------------------------------------------------------------------------------------------');
        console.log('Informe de alimentos');
        console.log('------------------------------------------------------------------------------------------');
        console.table(receta);
        calcularTotales(receta);
    }

    // presenta por consola la tabla de bebidas 

    if (bodega.length > 0) {
        console.log('------------------------------------------------------------------------------------------');
        console.log('Informe de bebidas');
        console.log('------------------------------------------------------------------------------------------');
        console.table(bodega);
        calcularTotales(bodega);
    }

}

// arma informe con totalizadores de Calorías Sodio y Grasas totales

function calcularTotales(r) {

    let iCantidad, iCalorias, iSodio, iGrasas;

    let totalCalorias = 0;
    let totalSodio = 0;
    let totalGrasas = 0;

    for (let i = 0; i < r.length; i++) {

        iCantidad = parseInt(r[i][2]);
        iCalorias = parseInt(r[i][3]);
        iSodio = parseInt(r[i][4]);
        iGrasas = parseInt(r[i][5]);

        totalCalorias = totalCalorias + iCantidad / 100 * iCalorias;
        totalSodio = totalSodio + iCantidad / 100 * iSodio;
        totalGrasas = totalGrasas + iCantidad / 100 * iGrasas;
    }

    // la función Math.round()retorna el valor de un número redondeado al entero más cercano.
    let cantidades = [
        {
            descripcion: 'Calorías',
            cantidad: Math.round(totalCalorias)
        },
        {
            descripcion: 'Sodio',
            cantidad: Math.round(totalSodio)
        },
        {
            descripcion: 'Grasas saturadas',
            cantidad: Math.round(totalGrasas)
        }
    ]
    console.table(cantidades);
}