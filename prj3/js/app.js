var seccionInicial = 1;
var updateBen = false;
/*$(".choice").removeClass("expand unset ");
$(".choice").addClass("small");
$("#seccion"+seccionInicial).removeClass("small");
$("#seccion"+seccionInicial).addClass("expand");
$("#previous").prop('disabled', true);

$(".choice").on("click", function(){
console.log("test");
$(".choice").removeClass("expand unset ");
$(".choice").addClass("small");
$(this).removeClass("small");
$(this).addClass("expand");
})*/
$('form').hide()
$(".choice").removeClass("expand unset ");
$(".choice").addClass("small");
$("#seccion1").removeClass("small");
$("#seccion1").addClass("expand");
$('form').show()
$('#updateBeneficiario').hide();
$('#cancelarUpdateBeneficiario').hide();

$(document).ready(function() {
    $(":input").inputmask();
    $('select').selectpicker();
    $("#previous").prop('disabled', true);
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('.selectpicker').selectpicker('mobile');
}

$('#cteNombresApellidos').selectpicker({
    liveSearch: true,
    liveSearchNormalize: true,
    liveSearchPlaceholder: 'Otros...',
});

$("#next").on("click", function() {

    $('#form' + seccionInicial).addClass('was-validated');
    //if ($('#form' + seccionInicial)[0].checkValidity() === true && seccionInicial != 2) {
    console.log(seccionInicial);
    $('#pb' + seccionInicial).removeClass("bg-transparent");
    $('#pb' + seccionInicial).addClass("bgProgress" + seccionInicial);
    //$("#pb"+seccionInicial).attr('aria-valuenow', 10).css('width', 10+'%');
    if (seccionInicial >= 1 && seccionInicial < $(".choice").length) {
        seccionInicial++;
        $("#previous").prop('disabled', false);
    } else
        $("#next").prop('disabled', true);
    //seccionInicial = 1;


    $(".choice").removeClass("expand unset ");
    $(".choice").addClass("small");
    $("#seccion" + seccionInicial).removeClass("small");
    $("#seccion" + seccionInicial).addClass("expand");
    //$("#pb"+seccionInicial).attr('aria-valuenow', 10).css('width', 10+'%');
    //}

})

$("#previous").on("click", function() {
    console.log("test");
    console.log(seccionInicial);
    $('#pb' + seccionInicial).removeClass("bgProgress" + seccionInicial);
    $('#pb' + seccionInicial).addClass("bg-transparent");
    if (seccionInicial > 1 && seccionInicial < $(".choice").length + 1) {
        seccionInicial--;
        $("#next").prop('disabled', false);
    } else
        $("#previous").prop('disabled', true);
    //seccionInicial = 1;
    // $("#pb"+seccionInicial).attr('aria-valuenow', 0).css('width', 0+'%');
    $(".choice").removeClass("expand unset ");
    $(".choice").addClass("small");
    $("#seccion" + seccionInicial).removeClass("small");
    $("#seccion" + seccionInicial).addClass("expand");

})
$('#fechaNacimiento').datepicker({
    autoclose: true,
    todayHighlight: true,
    language: "es",
    orientation: "bottom auto",
    enableOnReadonly: false,
    disableTouchKeyboard: true,
    format: "mm/dd/yyyy",
});
$('#fechaDebito').datepicker({
    autoclose: true,
    todayHighlight: true,
    language: "es",
    orientation: "bottom auto",
    enableOnReadonly: false,
    disableTouchKeyboard: true,
    format: "mm/dd/yyyy",
});


$("#expiraTC").datepicker({
    format: "mm-yyyy",
    startView: "months",
    minViewMode: "months",
    language: "es",
});

$('#fechaNacimiento').datepicker("setDate", new Date());

$('#benFechaNacimiento').datepicker({
    autoclose: true,
    todayHighlight: true,
    language: "es",
    orientation: "bottom auto",
    enableOnReadonly: false,
    disableTouchKeyboard: true,
    format: "mm/dd/yyyy",
});
$('#benFechaNacimiento').datepicker("setDate", new Date());


$("#benFechaNacimiento").change(function() {
    var today = new Date();
    var birthDate = new Date($(this).datepicker('getDate'));
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age)
    return $('#benEdad').val(age);
});

function GetAge(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

$('#benParentesco').change(function() {
    debugger;
    opcionParentesco = $('#form2 #benParentesco').val();
    if (opcionParentesco == 'titular') {
        if (updateBen === true) {
            $('#form2 #benParentesco').prop('disabled', true);
        }
        $('#form2 #benNombresApellidos').prop('readonly', true);
        $('#form2 #benNombresApellidos').val($('#form1 #nombres').val().trim() + ' ' + $('#form1 #apellidos').val().trim());
        $('#form2 #benFechaNacimiento').datepicker("setDate", $('#form1 #fechaNacimiento').val());
        $('#form2 #benFechaNacimiento').prop('readonly', true);
        $('#form2 #benPaisResidencia').val($('#form1 #paisResidencia').val());
        $('#form2 #benPaisOrigen').val($('#form1 #paisOrigen').val());
        $('#form2 #benPaisResidencia').prop('disabled', true);
        $('#form2 #benPaisOrigen').prop('disabled', true);
        $('#form2 select').selectpicker('refresh');
        $('#benFechaNacimiento').trigger('change');

    } else if (updateBen === true) {
        $('#form2 #benNombresApellidos').prop('readonly', false);
        $('#form2 #benFechaNacimiento').prop('readonly', false);
        $('#form2 #benPaisResidencia').prop('disabled', false);
        $('#form2 #benPaisOrigen').prop('disabled', false);
        $('#form2 select').selectpicker('refresh');
    } else {
        resetForm('form2');
        $('#benParentesco').val(opcionParentesco);
        $('#form2 select').selectpicker('refresh');
        $('#form2 #benNombresApellidos').prop('readonly', false);
        $('#form2 #benFechaNacimiento').prop('readonly', false);
        $('#form2 #benPaisResidencia').prop('disabled', false);
        $('#form2 #benPaisOrigen').prop('disabled', false);
        $('#form2 select').selectpicker('refresh');
    }
})


var cantBeneficiarios = 0;
var idTablaGlobal;
var arrayBeneficiarios = [];
$("#addBeneficiario").on("click", function() {
    $('#form2').addClass('was-validated');
    if ($('#form2')[0].checkValidity() === true) {
        $('#form2 #benPaisResidencia').prop('disabled', false);
        $('#form2 #benPaisOrigen').prop('disabled', false);
        $('#form2 select').selectpicker('refresh');
        var serialForm = ($('#form2').serializeArray());
        strHtmlTable = '';
        arrayLinea = []
        serialForm.forEach(function(element) {
            console.log(element);
            strHtmlTable = strHtmlTable + '<td>' + element['value'] + '</td>';
            arrayLinea.push(element['value']);
            console.log(arrayLinea);
        });
        arrayBeneficiarios["'" + cantBeneficiarios + "'"] = [];
        arrayBeneficiarios["'" + cantBeneficiarios + "'"] = arrayLinea;
        strHtmlTable = '<tr id="trBen_' + cantBeneficiarios + '">' + strHtmlTable + '<td><button type="button" onClick="editarBen(' + cantBeneficiarios + ')" class="btn btn-info"><i class="bi bi-pen-fill"></i></button></td><td><button type="button" class="btn btn-danger" onClick="quitarBen(' + cantBeneficiarios + ')"><i class="bi bi-trash-fill"></i></button></td></tr>';
        $('[id^=benPregunta]').append('<option value=' + cantBeneficiarios + '>' + arrayLinea[1] + '</option>');
        $('[id^=benPregunta]').selectpicker('refresh');
        $('#cteNombresApellidos').append('<option value=' + cantBeneficiarios + '>' + arrayLinea[1] + '</option>');
        $('#cteNombresApellidos').selectpicker('refresh');
        $("#listaBeneficiarios > tbody").append(strHtmlTable);
        console.log(strHtmlTable);
        $('#form2')[0].reset();
        $('#form2 select').selectpicker('refresh');
        $('#form2').removeClass('was-validated');
        cantBeneficiarios++;

    }
});

$("#updateBeneficiario").on("click", function() {
    $('#form2').addClass('was-validated');
    if ($('#form2')[0].checkValidity() === true) {
        updateBen = false;
        $('#form2 #benPaisResidencia').prop('disabled', false);
        $('#form2 #benPaisOrigen').prop('disabled', false);
        $('#form2 #benParentesco').prop('disabled', false);
        $('#form2 select').selectpicker('refresh');
        var serialForm = ($('#form2').serializeArray());
        strHtmlTable = '';
        arrayLinea = []
        serialForm.forEach(function(element) {
            console.log(element);
            strHtmlTable = strHtmlTable + '<td>' + element['value'] + '</td>';
            arrayLinea.push(element['value']);
            console.log(arrayLinea);
        });
        arrayBeneficiarios["'" + idTablaGlobal + "'"] = [];
        arrayBeneficiarios["'" + idTablaGlobal + "'"] = arrayLinea;
        $('#listaBeneficiarios > tbody #trBen_' + idTablaGlobal).html('');
        $('#listaBeneficiarios > tbody #trBen_' + idTablaGlobal).html(strHtmlTable + '<td><button type="button" onClick="editarBen(' + idTablaGlobal + ')" class="btn btn-info"><i class="bi bi-pen-fill"></i></button></td><td><button type="button" class="btn btn-danger" onClick="quitarBen(' + idTablaGlobal + ')"><i class="bi bi-trash-fill"></i></button></td>');
        $("option[value=optionvalue]").html('New text');
        $('[id^=benPregunta] option[value=' + idTablaGlobal + ']').html(arrayLinea[1]);
        $('[id^=benPregunta]').selectpicker('refresh');
        $('#cteNombresApellidos option[value=' + idTablaGlobal + ']').html(arrayLinea[1]);
        $('#cteNombresApellidos').selectpicker('refresh');
        console.log(strHtmlTable);
        $('#addBeneficiario').show();
        $('#updateBeneficiario').hide();
        $('#form2')[0].reset();
        $('#form2').removeClass('was-validated');
        $('#cancelarUpdateBeneficiario').hide();
        $('#form2 select').selectpicker('refresh');
    }
});

function editarBen(idTabla) {
    debugger;
    updateBen = true;
    console.log(idTabla)
    idTablaGlobal = idTabla;
    arrayLinea = arrayBeneficiarios["'" + idTabla + "'"];
    $('#benNombresApellidos').val(arrayLinea[1]);
    $('#benParentesco').val(arrayLinea[0]);
    $('#benFechaNacimiento').datepicker("setDate", arrayLinea[2]);
    $('#benPaisResidencia').val(arrayLinea[4]);
    $('#benPaisOrigen').val(arrayLinea[5]);
    $('#addBeneficiario').hide();
    $('#updateBeneficiario').show();
    $('#cancelarUpdateBeneficiario').show();
    $('#form2 select').selectpicker('refresh');
    $('#benParentesco').trigger('change');
}

function quitarBen(idTabla) {
    //$('#listaBeneficiarios #trBen_'+idTabla).remove();
    idTablaGlobal = idTabla;
    $('#confirmacionOpcion').modal('show')
    console.log(idTabla)

}

function resetForm(idForm) {
    if (idForm == 'form2') {
        $('#form2')[0].reset();
        $('#updateBeneficiario').hide();
        $('#cancelarUpdateBeneficiario').hide();
        $('#addBeneficiario').show();
        $('#form2 select').selectpicker('refresh');
        updateBen = false;
    }
}

$("#cancelarUpdateBeneficiario").on("click", function() {
    resetForm('form2');
});

function respuestaCheck(idPregunta, elemento) {
    if (elemento.checked) {
        $('#benPregunta' + idPregunta).prop('disabled', false);
        $('#benPregunta' + idPregunta).selectpicker('refresh');
    } else {
        $('#benPregunta' + idPregunta).prop('disabled', true);
        $('#benPregunta' + idPregunta).selectpicker('refresh');
    }
}



var modalConfirm = function(callback) {

    $("#btn-confirm").on("click", function() {
        $("#confirmacionOpcion").modal('show');
    });

    $("#modal-btn-si").on("click", function() {
        callback(true);
        $("#confirmacionOpcion").modal('hide');
    });

    $("#modal-btn-no").on("click", function() {
        callback(false);
        $("#confirmacionOpcion").modal('hide');
    });
};

modalConfirm(function(confirm) {
    if (confirm) {
        //Acciones si el usuario confirma
        $('#listaBeneficiarios #trBen_' + idTablaGlobal).remove();
        delete arrayBeneficiarios["'" + idTablaGlobal + "'"];
        $('[id^=benPregunta] option[value=' + idTablaGlobal + ']').remove();
        $('[id^=benPregunta]').selectpicker('refresh');
        $('#cteNombresApellidos option[value=' + idTablaGlobal + ']').remove();
        $('#cteNombresApellidos').selectpicker('refresh');
    }
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        console.log('Validando Form');
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

//localStorage.setItem("Nombre", nom);
var canvas = document.getElementById('signature-pad');

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

document.getElementById('clear').addEventListener('click', function() {
    signaturePad.clear();
});