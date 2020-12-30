document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const currencyIn = document.querySelector('.currency-type-in'),
          currencyOut = document.querySelector('.currency-type-out'),
          input = document.querySelector('.input'),
          totalOut = document.getElementById('total-out'),
          currencyInName = document.getElementById('currency-in-name'),
          currencyOutName = document.getElementById('currency-out-name'),
          btn = document.querySelector('.btn');

    const currencies = {
        RUB: 'российкий рубль (RUB)',
        USD: 'доллар США (USD)',
        EUR: 'евро (EUR)'
    };

    //переводим из одной валюты в другую и прописываем в span
    const calculate = (value, rate) => {
        totalOut.value = (+value * +rate).toFixed(2);
    };

    const getData = (url) => {
        fetch(url)
            .then((response) => {
                if (!response.ok){
                    throw new Error('Network status is not 200');
                }
                return response.json();
            })
            .then ((response) => {
                console.log(response);
                for (let key in response.rates){
                    if (key === currencyOut.value){
                        calculate(input.value, response.rates[key]);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    document.getElementById('currency').addEventListener('change', (event) => {
        let target = event.target;
        if (target === currencyIn) {
            for (let key in currencies){
                if (key === target.value) {
                    currencyInName.textContent = currencies[key];
                }
            }
        } else if (target === currencyOut) {
            for (let key in currencies){
                   if (key === target.value) {
                   currencyOutName.textContent = currencies[key];
                }
            }
        }
    });

    input.addEventListener('input', event => {
        event.target.value = event.target.value.replace(/\D/g, '');
    });

    btn.addEventListener('click', () => {
        if (currencyIn.value === '' || currencyOut.value === '') {
            alert(`Для конвертации необходимо выбрать валюты!`);
        } else if (input.value === '') {
            alert(`Введите сумму, которую надо конвертировать!`);
        } else {
            let url = 'https://api.exchangeratesapi.io/latest?base=' + currencyIn.value;
            getData(url);
        }
    });
});