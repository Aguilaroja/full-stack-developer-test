$("#plates").focus(function() {
    $('#error').html('');
})

$('#btnRegisterIn').click(function() {
    let plates = $('#plates').val();

    if (plates == '') {
        $('#error').html('Necesitas llenar el formulario para continuar con el registro de entrada');

    } else {
        $.ajax({
            type: 'POST',
            url: '/api/parking/register/entry', //Ésta ruta debe ser del mismo tipo que se va a consumir un servicio del API
            data: {
                plates
            },
            headers: {
                id: '435897e6-a972-45f6-af36-9c1b5f8f9ff7',
                key: '$2b$10$iJurgCo.RXXmZ8uEe78Ynuhe9ShYzQ1BFERPbZMpBihr.eQGZYiqK'
            },
            success: function(param) {
                if (param.ok == true) {
                    $('.centrado').html('Registro de entrada completado con éxito');
                }
            },
            error: function(error) {
                $('#error').html(error.responseJSON.info);
            }
        });
    }
});

$('#btnRegisterOut').click(function() {
    let plates = $('#plates').val();

    if (plates == '') {
        $('#error').html('Necesitas llenar el formulario para continuar con el registro de salida');

    } else {
        $.ajax({
            type: 'POST',
            url: '/api/parking/register/exit', //Ésta ruta debe ser del mismo tipo que se va a consumir un servicio del API
            data: {
                plates
            },
            headers: {
                id: '435897e6-a972-45f6-af36-9c1b5f8f9ff7',
                key: '$2b$10$iJurgCo.RXXmZ8uEe78Ynuhe9ShYzQ1BFERPbZMpBihr.eQGZYiqK'
            },
            success: function(param) {
                if (param.ok == true) {
                    let type = param.info.type;
                    if (type === 'no-resident') {
                        $('.centrado').html(`Minutos transcurridos: ${param.info.minutes}<br>Monto: $${param.info.amount}`);
                    } else if (type === 'resident' || type === 'official') {
                        $('.centrado').html('Registro de salida completado con éxito');
                    }
                }
            },
            error: function(error) {
                $('#error').html(error.responseJSON.info);
            }
        });
    }
});