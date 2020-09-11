$("document").ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/parking/type', //Ésta ruta debe ser del mismo tipo que se va a consumir un servicio del API
        headers: {
            id: '435897e6-a972-45f6-af36-9c1b5f8f9ff7',
            key: '$2b$10$iJurgCo.RXXmZ8uEe78Ynuhe9ShYzQ1BFERPbZMpBihr.eQGZYiqK'
        },
        success: function(param) {
            if (param.ok == true) {
                let types = '';
                param.info.forEach(object => {
                    types += `<option value="${object.type}">${object.type}</option>`;
                });
                $('#type').append(types);
            }
        },
        error: function(error) {
            $('#error').html(error.responseJSON.info);
        }
    });
    $('#error').html('');
})

$('#btnRegisterVehicle').click(function() {
    let type = $('#type').val();
    let plates = $('#plates').val();

    if (plates == '') {
        $('#error').html('Necesitas llenar el formulario para continuar con el registro de salida');

    } else {
        $.ajax({
            type: 'POST',
            url: '/api/parking/create/vehicle', //Ésta ruta debe ser del mismo tipo que se va a consumir un servicio del API
            data: {
                plates,
                type
            },
            headers: {
                id: '435897e6-a972-45f6-af36-9c1b5f8f9ff7',
                key: '$2b$10$iJurgCo.RXXmZ8uEe78Ynuhe9ShYzQ1BFERPbZMpBihr.eQGZYiqK'
            },
            success: function(param) {
                if (param.ok == true) {
                    $('.centrado').html(`Placas registradas correctamente: ${param.info.plates}`);
                }
            },
            error: function(error) {
                $('#error2').html(error.responseJSON.info);
            }
        });
    }
});