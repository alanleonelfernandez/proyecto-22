$(document).ready(function() {
    const apiUrl = 'http://localhost:3000';

    function mostrarValoresDolar() {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
        const day = ('0' + fechaActual.getDate()).slice(-2);
        const fechaFormateada = `${year}/${month}/${day-1}`;
        const urlDolarAPI = `https://api.argentinadatos.com/v1/cotizaciones/dolares/oficial/${fechaFormateada}/`;

        fetch(urlDolarAPI)
            .then(response => response.json())
            .then(data => {
                const compraUSD = data.compra;
                const ventaUSD = data.venta;

                $('#compra-usd').html(`<strong>${compraUSD}</strong>`);
                $('#venta-usd').html(`<strong>${ventaUSD}</strong>`);
            })
            .catch(error => {
                console.error('Error al obtener el valor del dólar:', error);
                $('#resultado').html('<p>Error al obtener el valor del dólar. Por favor, intente de nuevo más tarde.</p>');
            });
    }
    mostrarValoresDolar();

    function mostrarSaldosUsuario() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            alert("No se encontró el token de autenticación. Por favor, inicie sesión de nuevo.");
            return;
        }
        fetch(`${apiUrl}/usuarios/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            $('#saldo-ars').html(`<strong>${data.saldo_ars}</strong>`);
            $('#saldo-usd').html(`<strong>${data.saldo_usd}</strong>`);
        })
        .catch(error => {
            console.error('Error al obtener los saldos del usuario:', error);
            $('#resultado').html('<p>Error al obtener los saldos del usuario. Por favor, intente de nuevo más tarde.</p>');
        });
    }
    mostrarSaldosUsuario();

    $('#realizar-operacion').click(function() {
        const tipoOperacion = $('#tipo-operacion').val();
        const importeARS = $('#importe-ars').val();
        if (!importeARS) {
            alert("Por favor ingrese un importe.");
            return;
        }
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
        const day = ('0' + fechaActual.getDate()).slice(-2);
        const fechaFormateada = `${year}/${month}/${day-1}`;
        const urlDolarAPI = `https://api.argentinadatos.com/v1/cotizaciones/dolares/oficial/${fechaFormateada}/`;
        fetch(urlDolarAPI)
            .then(response => response.json())
            .then(data => {
                const valorDolar = tipoOperacion === 'C' ? data.compra : data.venta;
                const importeUSD = (importeARS / valorDolar).toFixed(2);
                const operacion = {
                    tipoOperacion: tipoOperacion,
                    importeARS: importeARS,
                    importeUSD: importeUSD
                };
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No se encontró el token de autenticación.');
                    $('#resultado').html('<p>Error de autenticación. Por favor, inicie sesión de nuevo.</p>');
                    return;
                }
                fetch(`${apiUrl}/usuarios/op`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(operacion)
                })
                .then(response => response.json())
                .then(data => {
                    $('#resultado').html(`<p style="color: green;">${data.message}</p>`);
                    alert(`Operación realizada con éxito.\nSaldo ARS: ${data.saldo_ars}\nSaldo USD: ${data.saldo_usd}`);
                    // Actualizar los saldos después de la operación
                    $('#saldo-ars').html(`<strong>${data.saldo_ars}</strong>`);
                    $('#saldo-usd').html(`<strong>${data.saldo_usd}</strong>`);
                })
                .catch(error => {
                    console.error('Error al realizar la operación:', error);
                    $('#resultado').html('<p style="color: red;">Error al realizar la operación.</p>');
                });
            })
            .catch(error => {
                console.error('Error al obtener el valor del dólar:', error);
                $('#resultado').html('<p style="color: red;">Error al obtener el valor del dólar.</p>');
            });
    });
});
