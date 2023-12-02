document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const selectOption = document.getElementById('selectOption');
    const ci = document.getElementById('ci').value.trim();
    const cf = document.getElementById('cf').value.trim();
    const vi = document.getElementById('vi').value.trim();
    const vf = document.getElementById('vf').value.trim();

    const resultadosContainer = document.getElementById('resultados');

    // Mostrar el contenedor de resultados para todas las opciones
    resultadosContainer.style.display = 'block';

    function parseValue(value) {
        const numericValue = parseFloat(value.replace('%', ''));
        return isNaN(numericValue) ? null : numericValue;
    }

    let result;
    let unit;

    if (selectOption.value === 'ci') {
        const numericCf = parseValue(cf);
        const numericVi = parseValue(vi);
        const numericVf = parseValue(vf);

        if (numericCf === null || numericVi === null || numericVf === null || numericVi === 0) {
            document.getElementById('result').textContent = "Por favor, completa los campos de forma correcta para la opción 'Ci'";
            document.getElementById('result1').textContent = "";
            return;
        }
        result = Math.round((numericCf * numericVf) / numericVi * 100) / 100;
        unit = 'M';
    } else if (selectOption.value === 'cf') {
        const numericCi = parseValue(ci);
        const numericVi = parseValue(vi);
        const numericVf = parseValue(vf);

        if (numericCi === null || numericVi === null || numericVf === null || numericVi === 0) {
            document.getElementById('result').textContent = "Por favor, completa los campos de forma correcta para la opción 'Cf'";
            document.getElementById('result1').textContent = "";
            return;
        }
        result = Math.round((numericCi * numericVi) / numericVf * 100) / 100;
        unit = 'M';
    } else if (selectOption.value === 'vi') {
        const numericCf = parseValue(cf);
        const numericVf = parseValue(vf);
        const numericCi = parseValue(ci);

        if (numericCf === null || numericVf === null || numericCi === null) {
            document.getElementById('result').textContent = "Por favor, completa los campos de forma correcta para la opción 'Vi'";
            document.getElementById('result1').textContent = "";
            return;
        }
        result = Math.round((numericCf * numericVf) / numericCi * 100) / 100;
        unit = 'L';
    } else if (selectOption.value === 'vf') {
        const numericCi = parseValue(ci);
        const numericVi = parseValue(vi);
        const numericCf = parseValue(cf);

        if (numericCi === null || numericVi === null || numericCf === null || numericVi === 0) {
            document.getElementById('result').textContent = "Por favor, completa los campos de forma correcta para la opción 'Vf'";
            document.getElementById('result1').textContent = "";
            return;
        }
        result = Math.round((numericCi * numericVi) / numericCf * 100) / 100;
        unit = 'L';
    }

    const selectedOptionText = selectOption.options[selectOption.selectedIndex].text.charAt(0).toUpperCase() + selectOption.options[selectOption.selectedIndex].text.slice(1);

    if (selectOption.value === 'vi') {
        document.getElementById('result').textContent = selectedOptionText + ' = ' + result + unit;
        document.getElementById('result1').textContent = "Para preparar la solucion solicitada tome " + (result * 1000) + "ml " + "y adicione " + ((parseValue(vf) - result) * 1000) + "ml de agua hasta completar: " + vf + unit;
    } else if (selectOption.value === 'vf') {
        document.getElementById('result').textContent = selectedOptionText + ' = ' + result + ' ' + unit;
        document.getElementById('result1').textContent = "Para preparar la solucion solicitada tome " + (parseValue(vi) * 1000) + "ml " + "y adicione " + Math.round((result - parseValue(vi)) * 1000) + "ml de agua en un frasco";
    } else {
        document.getElementById('result').textContent = selectedOptionText + ' = ' + result + ' ' + unit;
        document.getElementById('result1').textContent = "";
    }
    resultadosContainer.scrollIntoView({ behavior: 'smooth' });
});



document.querySelector('.css-button-3d--sky[type="reset"]').addEventListener('click', function () {
    document.getElementById('resultados').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('result1').textContent = '';
});
